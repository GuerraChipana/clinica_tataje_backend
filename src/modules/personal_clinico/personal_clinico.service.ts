import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonalClinicoDto } from './dto/create-personal_clinico.dto';
import { UpdatePersonalClinicoDto } from './dto/update-personal_clinico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalClinico } from './entities/personal_clinico.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from './enums/roles.enum';
import { CambiarCredencialesDto } from './dto/cambiar-credenciales.dto';

@Injectable()
export class PersonalClinicoService {
  constructor(
    @InjectRepository(PersonalClinico)
    private readonly personalClinicoRepository: Repository<PersonalClinico>,
  ) {}

  private async validaciones(
    createOrUpdateDto: CreatePersonalClinicoDto | UpdatePersonalClinicoDto,
    id_personal?: number,
  ) {
    if (createOrUpdateDto.dni) {
      const existingPersonal = await this.personalClinicoRepository.findOne({
        where: { dni: createOrUpdateDto.dni, id_personal: id_personal },
      });
      if (existingPersonal) {
        throw new BadRequestException('El DNI ya está registrado');
      }
    }

    if (createOrUpdateDto.email) {
      const existingEmail = await this.personalClinicoRepository.findOne({
        where: { email: createOrUpdateDto.email, id_personal: id_personal },
      });
      if (existingEmail) {
        throw new BadRequestException(
          'El correo electrónico ya está registrado',
        );
      }
    }
  }

  async crearPersonalClinico(
    createPersonalClinicoDto: CreatePersonalClinicoDto,
    rol: string,
  ): Promise<PersonalClinico> {
    // Validaciones de DNI y Email
    await this.validaciones(createPersonalClinicoDto);

    // Validación de roles
    if (!createPersonalClinicoDto.rol) {
      throw new BadRequestException('El rol es obligatorio');
    }
    // Verificación de rol del creador
    if (
      rol === RolesEnum.ADMINISTRADOR &&
      (createPersonalClinicoDto.rol === RolesEnum.SUPERADMINISTRADOR ||
        createPersonalClinicoDto.rol === RolesEnum.ADMINISTRADOR)
    ) {
      throw new BadRequestException(
        'Un administrador no puede crear a un superadministrador ni a otro administrador',
      );
    } else if (
      rol !== RolesEnum.SUPERADMINISTRADOR &&
      rol !== RolesEnum.ADMINISTRADOR
    ) {
      throw new BadRequestException(
        'No tienes permisos para crear personal clínico',
      );
    }

    // Hashing de la contraseña
    const hashPassword = await bcrypt.hash(
      createPersonalClinicoDto.password,
      10,
    );

    // Crear el nuevo personal clínico
    const newPersonalClinico = this.personalClinicoRepository.create({
      ...createPersonalClinicoDto,
      password: hashPassword,
    });

    // Guardar en la base de datos
    await this.personalClinicoRepository.save(newPersonalClinico);

    return newPersonalClinico;
  }

  // Método para cambiar las credenciales
  async cambiarCredenciales(
    id_personal: number,
    cambiarCredencialesDto: CambiarCredencialesDto,
  ): Promise<PersonalClinico> {
    const personalClinico = await this.personalClinicoRepository.findOne({
      where: { id_personal },
    });

    if (!personalClinico) {
      throw new BadRequestException('Personal clínico no encontrado');
    }

    // Verificar que el correo y la contraseña actuales coincidan
    if (personalClinico.email !== cambiarCredencialesDto.emailActual) {
      throw new BadRequestException('El correo electrónico actual no coincide');
    }

    const isPasswordValid = await bcrypt.compare(
      cambiarCredencialesDto.passwordActual,
      personalClinico.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('La contraseña actual no es válida');
    }

    if (cambiarCredencialesDto.emailNuevo) {
      const existingEmail = await this.personalClinicoRepository.findOne({
        where: { email: cambiarCredencialesDto.emailNuevo },
      });
      if (existingEmail) {
        throw new BadRequestException(
          'El correo electrónico nuevo ya está registrado',
        );
      }
      personalClinico.email = cambiarCredencialesDto.emailNuevo;
    }

    // Si la nueva contraseña es proporcionada, hashearla
    if (cambiarCredencialesDto.passwordNuevo) {
      const hashPassword = await bcrypt.hash(
        cambiarCredencialesDto.passwordNuevo,
        10,
      );
      personalClinico.password = hashPassword;
    }

    await this.personalClinicoRepository.save(personalClinico);
    return personalClinico;
  }

  async findAll(rol: string): Promise<PersonalClinico[]> {
    const personalClinico = await this.personalClinicoRepository.find();

    // Filtro segun el rol del usuario
    return rol === RolesEnum.ADMINISTRADOR
      ? personalClinico.filter(
          (usuaio) =>
            usuaio.rol !== RolesEnum.SUPERADMINISTRADOR &&
            usuaio.rol !== RolesEnum.ADMINISTRADOR,
        )
      : personalClinico; // Muestra todo para superadmin
  }

  async findOne(id_personal: number): Promise<PersonalClinico> {
    const personalClinico = await this.personalClinicoRepository.findOne({
      where: { id_personal },
    });

    return personalClinico;
  }

  remove(id: number) {
    return `This action removes a #${id} personalClinico`;
  }
}
