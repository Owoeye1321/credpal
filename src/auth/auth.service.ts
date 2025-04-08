import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { pbkdf2Sync } from 'crypto';
import AuthRepository from 'src/repositories/auth.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import VerifyEmailMailer from 'src/utilities/mailer/verify-email-mailer-class';
import OtpGenerator from 'src/utilities/otp-generator/otp-generator-class';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { WalletDto } from 'src/wallet/dto/create-wallet.dto';
import ReferenceGenerator from 'src/utilities/token-generator/refrence-class';
import { WalletRepository } from 'src/repositories/wallet.repository';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly verifyEmailClass: VerifyEmailMailer,
    private readonly OtpGenerator: OtpGenerator,
    private readonly referenceGenerator: ReferenceGenerator,
    private readonly walletService: WalletService,
  ) {}

  async register(
    userDto: UserDto,
  ): Promise<{ user: User; verificationHash: string }> {
    const { user: emailExist } = await this.authRepository.getUserByEmail(
      userDto.email,
    );
    if (emailExist) {
      throw new BadRequestException('User already exists');
    }
    const { otp, hash: verificationHash } = this.OtpGenerator.generate([
      userDto.email,
    ]);
    const passwordHash = await this.setPassword(userDto.password);

    const { user } = await this.authRepository.registerUser({
      ...userDto,
      password: passwordHash,
    });

    await this.verifyEmailClass.send(userDto.email, {
      username: userDto.username,
      otp: otp,
    });
    return { verificationHash, user: { ...user, password: null } };
  }

  async verifyEmail(
    verifyEmailDto: VerifyEmailDto,
  ): Promise<{ accessToken: string }> {
    const isVerified = this.OtpGenerator.validate(
      verifyEmailDto.otp,
      verifyEmailDto.verificationHash,
      [verifyEmailDto.email],
    );
    if (!isVerified) {
      throw new NotFoundException('Invalid OTP');
    }
    const { user: emailExist } = await this.authRepository.getUserByEmail(
      verifyEmailDto.email,
    );

    if (!emailExist) {
      throw new BadRequestException('Invalid Email');
    }
    if (emailExist?.isActive)
      throw new BadRequestException('User already verified');
    await this.authRepository.activateUser(verifyEmailDto.email);
    const wallets: WalletDto[] = [
      {
        userId: emailExist.id,
        balance: 0,
        currency: 'NGN',
        walletRef: this.referenceGenerator.generate(9),
      },
      {
        userId: emailExist.id,
        balance: 0,
        currency: 'USD',
        walletRef: this.referenceGenerator.generate(9),
      },
      {
        userId: emailExist.id,
        balance: 0,
        currency: 'EUR',
        walletRef: this.referenceGenerator.generate(9),
      },
      {
        userId: emailExist.id,
        balance: 0,
        currency: 'GBP',
        walletRef: this.referenceGenerator.generate(9),
      },
    ];
    await this.walletService.create(wallets);
    const accessToken = this.jwtService.sign({
      email: verifyEmailDto.email,
    });
    return { accessToken };
  }

  async setPassword(password: string): Promise<string> {
    try {
      const salt = this.configService.get<string>('PASSWORD_SALT')!;
      const passwordHash = pbkdf2Sync(
        password,
        salt,
        10000,
        512,
        'sha512',
      ).toString('hex');
      return passwordHash;
    } catch (error) {
      throw new UnprocessableEntityException('Error hashing password');
    }
  }

  validatePassword = async (
    hashedPassword: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const salt = this.configService.get<string>('PASSWORD_SALT')!;
      const hash = pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString(
        'hex',
      );
      return hashedPassword === hash;
    } catch (error) {
      throw new UnprocessableEntityException('Error validating password');
    }
  };
}
