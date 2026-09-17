import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  avatar?: string;
}
