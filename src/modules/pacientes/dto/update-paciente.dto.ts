import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { estadoCivil } from '../entities/paciente.entity';

export class UpdatePacienteDto {
  @IsOptional()
  @IsPhoneNumber('PE')
  telefono?: string;

  @IsOptional()
  @IsString()
  estado_civil?: estadoCivil;
}
