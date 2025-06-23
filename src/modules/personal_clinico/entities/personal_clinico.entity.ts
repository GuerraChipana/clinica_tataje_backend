import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Rol } from '../enums/roles.enum';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

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

  @Column()
  ubigeo: string;

  @Column({ type: 'enum', enum: ['Masculino', 'Femenino'] })
  genero: 'Masculino' | 'Femenino';

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ name: 'roles', type: 'enum', enum: Rol })
  rol: Rol;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
  
  @OneToMany(() => Medico, (medico) => medico.id_personal)
  medico: Medico[];
}
