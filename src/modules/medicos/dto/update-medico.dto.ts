import { IsOptional, IsInt, Min } from 'class-validator';

export class UpdateMedicoDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id_especialidad?: number;
}
