import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultasMedicaDto } from './create-consultas_medica.dto';

export class UpdateConsultasMedicaDto extends PartialType(CreateConsultasMedicaDto) {}
