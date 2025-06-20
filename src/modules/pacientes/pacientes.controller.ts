import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from '../personal_clinico/enums/roles.enum';
import { UserRequestReq } from '../personal_clinico/user-request.Req';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    try {
      return this.pacientesService.create(createPacienteDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  findAll() {
    try {
      return this.pacientesService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  findOne(@Param('id') id_paciente: number) {
    try {
      return this.pacientesService.findOne(id_paciente);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 🔒 Solo para PACIENTES autenticados
  @Patch('cell-estado')
  @UseGuards(AuthGuard('jwt'))
  camnioCellECivil(
    @Request() req: UserRequestReq,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    const id = req.user.id_personal;
    try {
      return this.pacientesService.cambioCelladnECivil(id, updatePacienteDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  remove(@Param('id') id: number) {
    try {
      return this.pacientesService.remove(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
