import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { PersonalClinicoService } from './personal_clinico.service';
import { CreatePersonalClinicoDto } from './dto/create-personal_clinico.dto';
import { UpdatePersonalClinicoDto } from './dto/update-personal_clinico.dto';
import { PersonalUserReq } from './user-request.Req';
import { CambiarCredencialesDto } from './dto/cambiar-credenciales.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from './enums/roles.enum';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('personalClinico')
export class PersonalClinicoController {
  constructor(
    private readonly personalClinicoService: PersonalClinicoService,
  ) {}

  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR)
  @Post()
  async create(
    @Body() createPersonalClinicoDto: CreatePersonalClinicoDto,
    @Request() req: PersonalUserReq,
  ) {
    const rol = req.user.rol;
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
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  async credencial(
    @Request() req: PersonalUserReq,
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
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR)
  async findAll(@Request() req: PersonalUserReq) {
    const rol = req.user.rol;

    try {
      return this.personalClinicoService.findAll(rol);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @Get(':id')
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR)
  async findOne(@Param('id') id_personal: number) {
    try {
      return this.personalClinicoService.findOne(id_personal);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }
}
