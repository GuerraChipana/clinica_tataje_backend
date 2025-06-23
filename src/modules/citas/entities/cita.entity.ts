import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstadoCitaEnum } from '../enum/estado-cita.enum';
import { Paciente } from 'src/modules/pacientes/entities/paciente.entity';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id_cita: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.citas,{ eager: true })
  @JoinColumn({ name: 'id_paciente' })
  id_paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.citas, { eager: true })
  @JoinColumn({ name: 'id_medico' })
  id_medico: Medico;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'text', nullable: true })
  motivo: string;

  @Column({
    type: 'enum',
    enum: EstadoCitaEnum,
    default: EstadoCitaEnum.PROGRAMADA,
  })
  estado: EstadoCitaEnum;
}
