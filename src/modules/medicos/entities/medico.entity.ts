import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Especialidades } from '../../especialidades/entities/especialidades.entity';
import { PersonalClinico } from '../../personal_clinico/entities/personal_clinico.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id_medico: number;

  @ManyToOne(() => PersonalClinico, { eager: true })
  @JoinColumn({ name: 'id_personal' }) // clave foránea en esta tabla
  personalClinico: PersonalClinico;

  @ManyToOne(() => Especialidades, { eager: true })
  @JoinColumn({ name: 'id_especialidad' }) // clave foránea en esta tabla
  especialidad: Especialidades;
}
