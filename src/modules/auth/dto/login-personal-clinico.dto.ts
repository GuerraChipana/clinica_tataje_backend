import { IsEmail, IsString } from 'class-validator';

export class LoginPersonalClinicoDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
