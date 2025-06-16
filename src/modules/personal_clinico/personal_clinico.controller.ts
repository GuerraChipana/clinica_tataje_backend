import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PersonalClinicoService } from './personal_clinico.service';
import { CreatePersonalClinicoDto } from './dto/create-personal_clinico.dto';
import { UpdatePersonalClinicoDto } from './dto/update-personal_clinico.dto';
import { UserRequestReq } from './user-request.Req';
import { CambiarCredencialesDto } from './dto/cambiar-credenciales.dto';

@Controller('personalClinico')
export class PersonalClinicoController {
  constructor(
    private readonly personalClinicoService: PersonalClinicoService,
  ) {}

  @Post()
  async create(
    @Body() createPersonalClinicoDto: CreatePersonalClinicoDto,
    @Request() req: UserRequestReq,
  ) {
    const rol = req.user.rol; // Obtener el rol del usuario autenticado

    try {
      return this.personalClinicoService.crearPersonalClinico(
        createPersonalClinicoDto,
        rol,
      );
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @Patch('credenciales')
  async credencial(
    @Request() req: UserRequestReq,
    @Body() cambiarCredencialesDto: CambiarCredencialesDto,
  ) {
    const id_personal = req.user.id_personal;
    try {
      return this.personalClinicoService.cambiarCredenciales(
        id_personal,
        cambiarCredencialesDto,
      );
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @Get()
  async findAll(@Request() req: UserRequestReq) {
    const rol = req.user.rol;

    try {
      return this.personalClinicoService.findAll(rol);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id_personal: number) {
    try {
      return this.personalClinicoService.findOne(id_personal);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalClinicoService.remove(+id);
  }
}
