import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HistoriaMedica } from './entities/historia_medica.entity';
import { Repository } from 'typeorm';
import { ConsultasMedica } from '../consultas_medicas/entities/consultas_medica.entity';
import { BuscarCitaPacienteDto } from '../citas/dto/buscar-cita-paciente.dto';

@Injectable()
export class HistoriaMedicaService {
  constructor(
    @InjectRepository(HistoriaMedica)
    private readonly historiaRepo: Repository<HistoriaMedica>,
    @InjectRepository(ConsultasMedica)
    private readonly consultaRepo: Repository<ConsultasMedica>,
  ) {}

  async crearHistoriaSiNoExiste(id_paciente: number): Promise<HistoriaMedica> {
    const historiaExistente = await this.historiaRepo.findOne({
      where: { id_paciente },
    });
    if (historiaExistente) return historiaExistente;

    const nueva = this.historiaRepo.create({ id_paciente });
    return this.historiaRepo.save(nueva);
  }

  async obtenerHistorialDePaciente(id_paciente: number) {
    const historia = await this.historiaRepo.findOne({
      where: { id_paciente: id_paciente },
    });

    if (!historia) {
      throw new NotFoundException(
        'El paciente no tiene historia médica registrada',
      );
    }

    const consultas = await this.consultaRepo.find({
      where: { historia: { id_historia: historia.id_historia } },
      relations: [
        'cita',
        'cita.id_medico',
        'cita.id_medico.id_personal',
        'cita.id_medico.id_especialidad',
        'cita.id_paciente',
      ],
      order: {
        fecha_consulta: 'DESC',
      },
    });

    // Opcional: simplificas la respuesta si quieres limitar los campos
    const resultado = consultas.map((c) => ({
      id_consulta: c.id_consulta,
      fecha_consulta: c.fecha_consulta,
      diagnostico: c.diagnostico,
      tratamiento: c.tratamiento,
      observaciones: c.observaciones,
      cita: {
        id_cita: c.cita.id_cita,
        fecha: c.cita.fecha,
        hora: c.cita.hora,
        motivo: c.cita.motivo,
        medico: {
          id_medico: c.cita.id_medico.id_medico,
          nombres: c.cita.id_medico.id_personal.nombres,
          apellido_paterno: c.cita.id_medico.id_personal.apellido_paterno,
          especialidad: c.cita.id_medico.id_especialidad.nombre,
        },
      },
    }));

    return resultado;
  }

  async obtenerHistorialpacienteID(dto: BuscarCitaPacienteDto) {
    const historia = await this.historiaRepo.findOne({
      where: { id_paciente: dto.id_paciente },
    });

    if (!historia) {
      throw new NotFoundException(
        'El paciente no tiene historia médica registrada',
      );
    }

    const consultas = await this.consultaRepo.find({
      where: { historia: { id_historia: historia.id_historia } },
      relations: [
        'cita',
        'cita.id_medico',
        'cita.id_medico.id_personal',
        'cita.id_medico.id_especialidad',
        'cita.id_paciente',
      ],
      order: {
        fecha_consulta: 'DESC',
      },
    });

    // Opcional: simplificas la respuesta si quieres limitar los campos
    const resultado = consultas.map((c) => ({
      id_consulta: c.id_consulta,
      fecha_consulta: c.fecha_consulta,
      diagnostico: c.diagnostico,
      tratamiento: c.tratamiento,
      observaciones: c.observaciones,
      cita: {
        id_cita: c.cita.id_cita,
        fecha: c.cita.fecha,
        hora: c.cita.hora,
        motivo: c.cita.motivo,
        medico: {
          id_medico: c.cita.id_medico.id_medico,
          nombres: c.cita.id_medico.id_personal.nombres,
          apellido_paterno: c.cita.id_medico.id_personal.apellido_paterno,
          especialidad: c.cita.id_medico.id_especialidad.nombre,
        },
      },
    }));

    return resultado;
  }
}
