import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CambiarCredencialesDto {
  @IsEmail()
  emailActual: string;

  @IsString()
  passwordActual: string;

  @IsOptional()
  @IsEmail()
  emailNuevo?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  passwordNuevo?: string;
}
