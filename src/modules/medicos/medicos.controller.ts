import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Rol } from '../personal_clinico/enums/roles.enum';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  async crear(@Body() dto: CreateMedicoDto) {
    try {
      return this.medicosService.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  update(@Param('id') id: number, @Body() updateMedicoDto: UpdateMedicoDto) {
    try {
      return this.medicosService.update(id, updateMedicoDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return this.medicosService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.medicosService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  async delete(@Param('id') id: number) {
    try {
      return this.medicosService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
