import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
  Request,
} from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { AuthGuard } from '@nestjs/passport';
import { PacienteUserReq } from '../personal_clinico/user-request.Req';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from '../personal_clinico/enums/roles.enum';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  // Crear cita por paciente
  @UseGuards(AuthGuard('jwt'))
  @Post('paciente')
  createPaciente(
    @Request() req: PacienteUserReq,
    @Body() createCitaDto: CreateCitaDto,
  ) {
    const id = req.user.id_paciente;
    try {
      return this.citasService.createXPaciente(id, createCitaDto);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // Crear cita por personal
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @Post('personal')
  createPersonal(@Body() createCitaDto: CreateCitaDto) {
    try {
      return this.citasService.createXPersonal(createCitaDto);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  // Obtener todas las citas del paciente
  @UseGuards(AuthGuard('jwt'))
  @Get('paciente')
  findAllPaciente(@Request() req: PacienteUserReq) {
    const id = req.user.id_paciente;
    try {
      return this.citasService.findAllPaciente(id);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  // Obtener todas las citas (personal)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @Get('personal')
  findAllPersonal() {
    try {
      return this.citasService.findAllPersonal();
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  // Obtener una cita por ID
  @UseGuards(AuthGuard('jwt'))
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.citasService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  // Reprogramar cita
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  @Patch(':id')
  ReprogramarCita(
    @Param('id') id: number,
    @Body() updateCitaDto: UpdateCitaDto,
  ) {
    try {
      return this.citasService.ReprogramarCita(id, updateCitaDto);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  // Cambiar estado de cita
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  @Patch('estado/:id')
  CambiarEstadoCita(@Param('id') id: number, @Body() updatedto: UpdateCitaDto) {
    try {
      return this.citasService.cambioEstadoCita(id, {
        estado: updatedto.estado,
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  // Obtener todas las citas canceladas
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  @Get('personal/canceladas')
  findAllCitasCanceladas() {
    try {
      return this.citasService.findCitasCanceladas();
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }
}
