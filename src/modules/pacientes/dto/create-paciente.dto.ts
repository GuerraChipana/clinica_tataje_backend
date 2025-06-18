import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { estadoCivil } from '../entities/paciente.entity';

export class CreatePacienteDto {
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
  ubigeo: string;

  @IsString()
  estado_civil: estadoCivil;

  @IsPhoneNumber('PE')
  telefono: string;

  @Matches(/^(A|B|AB|O)[+-]$/, {
    message:
      'El grupo sanguíneo debe ser un formato válido (Ejemplo: O+, A-, B+, AB-).',
  })
  grupo_sanguineo: string;

  @IsString()
  password: string;
}
