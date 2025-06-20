import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMedicoDto {
  @IsInt()
  @IsNotEmpty()
  id_personal: number;

  @IsInt()
  @IsNotEmpty()
  id_especialidad: number;
}
