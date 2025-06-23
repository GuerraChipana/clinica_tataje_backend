import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Especialidades } from '../../especialidades/entities/especialidades.entity';
import { PersonalClinico } from '../../personal_clinico/entities/personal_clinico.entity';
import { Cita } from 'src/modules/citas/entities/cita.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id_medico: number;

  @ManyToOne(() => PersonalClinico, { eager: true })
  @JoinColumn({ name: 'id_personal' }) // clave foránea en esta tabla
  id_personal: PersonalClinico;

  @ManyToOne(() => Especialidades, { eager: true })
  @JoinColumn({ name: 'id_especialidad' }) // clave foránea en esta tabla
  id_especialidad: Especialidades;

  @OneToMany(() => Cita, (cita) => cita.id_medico)
  citas: Cita[];
}
