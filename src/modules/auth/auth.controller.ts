import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPersonalClinicoDto } from './dto/login-personal-clinico.dto';
import { LoginPacienteDto } from './dto/login-paciente.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Login/Personal_clinico')
  async LoginPersonal(@Body() dtoPersonal: LoginPersonalClinicoDto) {
    try {
      return await this.authService.loginPersonal(dtoPersonal);
    } catch (error) {
      throw new UnauthorizedException(
        `${error.message}` || 'Credenciales invalidas',
      );
    }
  }

  @Post('Login/Paciente')
  async LoginPaciente(@Body() dtoPaciente: LoginPacienteDto) {
    try {
      return await this.authService.loginPaciente(dtoPaciente);
    } catch (error) {
      throw new UnauthorizedException(
        `${error.message}` || 'Credenciales invalidas',
      );
    }
  }
}
