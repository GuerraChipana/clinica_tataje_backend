import { IsString, Length } from 'class-validator';

export class LoginPacienteDto {
  @IsString()
  @Length(8, 8)
  dni: string;

  @IsString()
  password: string;
}
