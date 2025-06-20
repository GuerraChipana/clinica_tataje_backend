import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Get,
} from '@nestjs/common';
import { ServicioReniecService } from './servicio-reniec.service';
import { CreateServicioReniecDto } from './dto/create-servicio-reniec.dto';

@Controller('reniec')
export class ServicioReniecController {
  constructor(private readonly servicioReniecService: ServicioReniecService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async consultarPorDni(@Body() dto: CreateServicioReniecDto) {
    try {
      return await this.servicioReniecService.consultarPorDni(dto);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @Post('consulta-dni')
  @HttpCode(HttpStatus.OK)
  async consultarPorDnis(@Body() dto: CreateServicioReniecDto) {
    try {
      return await this.servicioReniecService.consultarPorDniApis(dto);
    } catch (error) {
      console.error(
        'Error al consultar APIS:',
        error?.response?.data || error.message || error,
      );
      throw new InternalServerErrorException(
        `Error al consultar el servicio APIS: ${error?.response?.data?.message || error.message}`,
      );
    }
  }
}
