import * as crypto from 'crypto';
import OTP from './otp-generator-interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class OtpGenerator implements OTP {
  protected length: number = 6;
  protected expiry: number = 300; // In seconds
  private secret: string = '';

  constructor(private readonly configService: ConfigService) {}

  generate(params: string[] = []): { otp: string; hash: string } {
    const otp = crypto
      .randomBytes(Math.ceil(this.length / 2)) // Generate enough bytes
      .toString('hex') // Convert the bytes to a hexadecimal string
      .slice(0, this.length)
      .toUpperCase();
    const createdAt = Date.now();
    const hash =
      this.hashOtp([...params, createdAt.toString(), otp]) + `.${createdAt}`;

    return { otp, hash };
  }

  private hashOtp(params: string[]): string {
    return crypto
      .createHmac('sha256', this.configService.get<string>('OTP_SECRET')!)
      .update(params.join(''))
      .digest('hex');
  }

  validate(otp: string, hash: string, params: string[] = []): boolean {
    const [hashedOtp, date] = hash.split('.');
    const currentDate = Date.now();
    const otpExpiry = parseInt(date) + this.expiry * 1000;

    if (otpExpiry < currentDate) {
      return false;
    }

    return hashedOtp === this.hashOtp([...params, date.toString(), otp]);
  }
}
