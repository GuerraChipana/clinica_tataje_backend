import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum estadoCivil {
  D = 'D',
  C = 'C',
  V = 'V',
  S = 'S',
}

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Column({ length: 8, unique: true })
  dni: string;

  @Column({ length: 50 })
  nombres: string;

  @Column({ length: 50 })
  apellido_paterno: string;

  @Column({ length: 50 })
  apellido_materno: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'enum', enum: ['Masculino', 'Femenino'] })
  genero: 'Masculino' | 'Femenino';

  @Column({ length: 50 })
  ubigeo: string;

  @Column({ type: 'enum', enum: estadoCivil })
  estado_civil: estadoCivil;

  @Column({ type: 'varchar', length: 4 })
  grupo_sanguineo: string;

  @Column()
  telefono: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
}
