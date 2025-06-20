import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalClinico } from '../personal_clinico/entities/personal_clinico.entity';
import { Especialidades } from '../especialidades/entities/especialidades.entity';
import { Rol } from '../personal_clinico/enums/roles.enum';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,

    @InjectRepository(PersonalClinico)
    private readonly personalClinicoRepository: Repository<PersonalClinico>,

    @InjectRepository(Especialidades)
    private readonly especialidadesRepository: Repository<Especialidades>,
  ) {}

  private async validarPersonalClinico(id: number): Promise<PersonalClinico> {
    const personal = await this.personalClinicoRepository.findOne({
      where: { id_personal: id },
    });
    if (!personal) throw new NotFoundException('El personal clínico no existe');
    if (personal.rol !== Rol.MEDICO)
      throw new BadRequestException('El personal no tiene el rol de médico');
    const existeMedico = await this.medicoRepository.findOne({
      where: { personalClinico: { id_personal: id } },
    });
    if (existeMedico)
      throw new BadRequestException(
        'Este personal ya está registrado como médico',
      );
    return personal;
  }

  private async validarEspecialidad(id: number): Promise<Especialidades> {
    const especialidad = await this.especialidadesRepository.findOne({
      where: { id_especialidad: id },
    });
    if (!especialidad) throw new NotFoundException('La especialidad no existe');
    return especialidad;
  }

  async create(createMedicoDto: CreateMedicoDto): Promise<any> {
    const { id_personal, id_especialidad } = createMedicoDto;

    const personal = await this.validarPersonalClinico(id_personal);
    const especialidad = await this.validarEspecialidad(id_especialidad);

    const medico = this.medicoRepository.create({
      personalClinico: personal,
      especialidad: especialidad,
    });

    const savedMedico = await this.medicoRepository.save(medico);

    // Formatear respuesta manualmente
    return {
      id_medico: savedMedico.id_medico,
      especialidad: {
        id_especialidad: especialidad.id_especialidad,
        nombre: especialidad.nombre,
      },
      personalClinico: {
        id_personal: personal.id_personal,
        nombres: personal.nombres,
        apellido_paterno: personal.apellido_paterno,
        apellido_materno: personal.apellido_materno,
        email: personal.email,
      },
    };
  }

  async update(
    id_medico: number,
    updateMedicoDto: UpdateMedicoDto,
  ): Promise<any> {
    const medico = await this.medicoRepository.findOne({
      where: { id_medico },
      relations: ['personalClinico', 'especialidad'],
    });

    if (!medico) {
      throw new NotFoundException('El médico no existe');
    }

    const { id_especialidad } = updateMedicoDto;

    if (id_especialidad) {
      const nuevaEspecialidad = await this.validarEspecialidad(id_especialidad);
      medico.especialidad = nuevaEspecialidad;
    }

    const updatedMedico = await this.medicoRepository.save(medico);

    return {
      id_medico: updatedMedico.id_medico,
      especialidad: {
        id_especialidad: medico.especialidad.id_especialidad,
        nombre: medico.especialidad.nombre,
      },
      personalClinico: {
        id_personal: medico.personalClinico.id_personal,
        nombres: medico.personalClinico.nombres,
        apellido_paterno: medico.personalClinico.apellido_paterno,
        apellido_materno: medico.personalClinico.apellido_materno,
        email: medico.personalClinico.email,
      },
    };
  }

  async findAll(): Promise<any[]> {
    const medicos = await this.medicoRepository.find({
      relations: ['personalClinico', 'especialidad'],
    });

    return medicos.map((medico) => ({
      id_medico: medico.id_medico,
      especialidad: {
        id_especialidad: medico.especialidad.id_especialidad,
        nombre: medico.especialidad.nombre,
      },
      peronsal_clinico: {
        id_personal: medico.personalClinico.id_personal,
        nombres: medico.personalClinico.nombres,
        apellido_paterno: medico.personalClinico.apellido_paterno,
        apellido_materno: medico.personalClinico.apellido_materno,
        email: medico.personalClinico.email,
      },
    }));
  }

  async findOne(id_medico: number): Promise<any> {
    const medico = await this.medicoRepository.findOne({
      where: { id_medico },
      relations: ['personalClinico', 'especialidad'],
    });

    if (!medico) throw new NotFoundException('El médico no existe');

    return {
      id_medico: medico.id_medico,
      especialidad: {
        id_especialidad: medico.especialidad.id_especialidad,
        nombre: medico.especialidad.nombre,
      },
      personalClinico: {
        id_personal: medico.personalClinico.id_personal,
        nombres: medico.personalClinico.nombres,
        apellido_paterno: medico.personalClinico.apellido_paterno,
        apellido_materno: medico.personalClinico.apellido_materno,
        email: medico.personalClinico.email,
      },
    };
  }

  async delete(id_medico: number): Promise<{ message: string }> {
    const medico = await this.medicoRepository.findOne({
      where: { id_medico },
    });
    if (!medico) {
      throw new NotFoundException('El médico no existe');
    }
    await this.medicoRepository.remove(medico);
    return { message: 'Médico eliminado correctamente' };
  }
}
