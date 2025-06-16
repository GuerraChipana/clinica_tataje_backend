import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RolesEnum } from '../enums/roles.enum';

@Entity('personal_clinico')
export class PersonalClinico {
  @PrimaryGeneratedColumn()
  id_personal: number;

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
  departamento: string;

  @Column({ length: 40 })
  provincia: string;

  @Column({ length: 40 })
  distrito: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ name: 'roles', type: 'enum', enum: RolesEnum })
  rol: RolesEnum;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
}
