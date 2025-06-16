import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  IsString,
  IsOptional,
  IsDate,
  IsInt,
} from 'class-validator';
import { RolesEnum } from '../enums/roles.enum';

export class CreatePersonalClinicoDto {
  @IsNotEmpty()
  @Length(8, 8)
  dni: string;

  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsString()
  apellido_paterno: string;

  @IsNotEmpty()
  @IsString()
  apellido_materno: string;

  @IsNotEmpty()
  @IsDate()
  fecha_nacimiento: Date;

  @IsNotEmpty()
  @IsEnum(['Masculino', 'Femenino'])
  genero: 'Masculino' | 'Femenino';

  @IsOptional()
  @IsString()
  departamento: string;

  @IsOptional()
  @IsString()
  provincia: string;

  @IsOptional()
  @IsString()
  distrito: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(RolesEnum)
  rol: RolesEnum;
}
