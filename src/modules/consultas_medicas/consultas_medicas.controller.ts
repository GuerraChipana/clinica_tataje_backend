import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultasMedicasService } from './consultas_medicas.service';
import { CreateConsultasMedicaDto } from './dto/create-consultas_medica.dto';
import { UpdateConsultasMedicaDto } from './dto/update-consultas_medica.dto';

@Controller('consultas-medicas')
export class ConsultasMedicasController {
  constructor(
    private readonly consultasMedicasService: ConsultasMedicasService,
  ) {}

  @Post()
  create(@Body() createConsultasMedicaDto: CreateConsultasMedicaDto) {
    return this.consultasMedicasService.crearConsulta(createConsultasMedicaDto);
  }

  @Get()
  findAll() {
    return this.consultasMedicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultasMedicasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultasMedicaDto: UpdateConsultasMedicaDto,
  ) {
    return this.consultasMedicasService.update(+id, updateConsultasMedicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasMedicasService.remove(+id);
  }
}
