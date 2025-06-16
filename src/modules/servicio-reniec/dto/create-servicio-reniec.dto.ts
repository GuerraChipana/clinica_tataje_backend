import { IsString, Length } from 'class-validator';

export class CreateServicioReniecDto {
  @IsString()
  @Length(8, 8, {
    message: 'El número de documento debe tener exactamente 8 caracteres',
  })
  document_number: string;
}
