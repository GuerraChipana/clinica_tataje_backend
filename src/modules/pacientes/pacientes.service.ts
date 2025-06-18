import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    if (createPacienteDto.dni) {
      const dniExisting = await this.pacienteRepo.findOne({
        where: { dni: createPacienteDto.dni },
      });
      if (dniExisting) {
        throw new BadRequestException('El DNI ya esta registrado');
      }
    }

    const hashPassword = await bcrypt.hash(createPacienteDto.password, 10);

    const newPaciente = await this.pacienteRepo.create({
      ...createPacienteDto,
      password: hashPassword,
    });
    return await this.pacienteRepo.save(newPaciente);
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepo.find({
      select: {
        id_paciente: true,
        dni: true,
        nombres: true,
        apellido_paterno: true,
        apellido_materno: true,
        fecha_nacimiento: true,
        ubigeo: true,
        telefono: true,
        genero: true,
      },
    });
  }

  async findOne(id_paciente: number): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
    });
    if (!paciente) {
      throw new BadRequestException('Paciente no existente');
    }
    return paciente;
  }

  async cambioCelladnECivil(
    id_paciente: number,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
    });
    if (!paciente) {
      throw new BadRequestException('Paciente no existente');
    }
    await this.pacienteRepo.update(id_paciente, updatePacienteDto);

    const updatedPaciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
      select: { id_paciente: true, telefono: true, estado_civil: true },
    });

    return updatedPaciente;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
