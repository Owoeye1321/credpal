import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() registerDto: UserDto) {
    return { data: await this.authService.register(registerDto) };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/verify')
  async verify(@Body() verifyEmailDto: VerifyEmailDto) {
    return { data: await this.authService.verifyEmail(verifyEmailDto) };
  }
}
