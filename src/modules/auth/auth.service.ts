import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalClinico } from '../personal_clinico/entities/personal_clinico.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { LoginPacienteDto } from './dto/login-paciente.dto';
import { LoginPersonalClinicoDto } from './dto/login-personal-clinico.dto';
import ms = require('ms'); // ✅ Forma compatible con NestJS

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PersonalClinico)
    private personalRepo: Repository<PersonalClinico>,

    @InjectRepository(Paciente)
    private pacienteRepo: Repository<Paciente>,

    private jwtService: JwtService,
  ) {}

  async loginPersonal(dtoLogin: LoginPersonalClinicoDto) {
    const { email, password } = dtoLogin;

    const user = await this.personalRepo.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id_personal,
      name: user.nombres,
      rol: user.rol,
    };

    // 🔹 Obtenemos expiración y casteamos a StringValue de ms
    const expiresIn = (process.env.JWT_EXPIRES_IN || '1h') as ms.StringValue;

    const token = this.jwtService.sign(payload, { expiresIn });

    return {
      access_token: token,
      token_expiration: new Date(Date.now() + ms(expiresIn)).toISOString(),
    };
  }

  async loginPaciente(dtoLogin: LoginPacienteDto) {
    const { dni, password } = dtoLogin;

    const user = await this.pacienteRepo.findOne({ where: { dni } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id_paciente,
      dni: user.dni,
      name: user.nombres,
      rol: 'paciente',
    };

    const expiresIn = (process.env.JWT_EXPIRES_IN || '1h') as ms.StringValue;

    const token = this.jwtService.sign(payload, { expiresIn });

    return {
      access_token: token,
      token_expiration: new Date(Date.now() + ms(expiresIn)).toISOString(),
    };
  }
}