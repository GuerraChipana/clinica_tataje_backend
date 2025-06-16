import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ServicioReniecService } from './servicio-reniec.service';
import { CreateServicioReniecDto } from './dto/create-servicio-reniec.dto';

@Controller('reniec')
export class ServicioReniecController {
  constructor(private readonly servicioReniecService: ServicioReniecService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async consultarPorDni(@Body() dto: CreateServicioReniecDto) {
    return await this.servicioReniecService.consultarPorDni(dto);
  }
}
