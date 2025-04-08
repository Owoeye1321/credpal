import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  MinLength,
  minLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
