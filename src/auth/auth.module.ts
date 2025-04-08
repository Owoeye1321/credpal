import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import AuthRepository from 'src/repositories/auth.repository';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import SendGridMailer from 'src/providers/mail-provider/send-grid-class';
import RenderTemplate from 'src/providers/render-templates/render-email-templates';
import VerifyEmailMailer from 'src/utilities/mailer/verify-email-mailer-class';
import OtpGenerator from 'src/utilities/otp-generator/otp-generator-class';
import ReferenceGenerator from 'src/utilities/token-generator/refrence-class';
import { WalletModule } from 'src/wallet/wallet.module';
import { JwtAuthGuard } from './guard/auth.guard';

@Global() // 👈 This makes everything exported here global
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE') },
      }),
    }),
    WalletModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PrismaClient,
    SendGridMailer,
    VerifyEmailMailer,
    RenderTemplate,
    OtpGenerator,
    ReferenceGenerator,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
