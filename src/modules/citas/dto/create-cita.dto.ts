import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { EstadoCitaEnum } from '../enum/estado-cita.enum';

// Convierte DD-MM-YY o DD-MM-YYYY → YYYY-MM-DD
function parseFecha(fecha: string): string {
  const parts = fecha.split('-');
  if (parts.length === 3) {
    let [dia, mes, anio] = parts;
    if (anio.length === 2) {
      anio = `20${anio}`;
    }
    return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
  return fecha;
}

export class CreateCitaDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_paciente: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_medico: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseFecha(value))
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha debe estar en formato YYYY-MM-DD',
  })
  fecha: Date;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'La hora debe estar en formato HH:mm o HH:mm:ss',
  })
  @Transform(({ value }) => {
    const partes = value.split(':');
    if (partes.length === 2) {
      return `${partes[0].padStart(2, '0')}:${partes[1].padStart(2, '0')}:00`;
    }
    if (partes.length === 3) {
      return `${partes[0].padStart(2, '0')}:${partes[1].padStart(2, '0')}:${partes[2].padStart(2, '0')}`;
    }
    return value;
  })
  hora: string;

  @IsOptional()
  @IsString()
  motivo?: string;

  @IsOptional()
  @IsEnum(EstadoCitaEnum)
  estado?: EstadoCitaEnum;
}
