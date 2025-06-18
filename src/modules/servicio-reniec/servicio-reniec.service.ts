import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateServicioReniecDto } from './dto/create-servicio-reniec.dto';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio encargado de interactuar con la API de RENIEC para consultar información de personas por número de DNI.
 */
@Injectable()
export class ServicioReniecService {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('API_URL');
    this.apiToken = this.configService.get<string>('API_TOKEN');
  }

  async consultarPorDni(dto: CreateServicioReniecDto): Promise<any> {
    const payload = {
      token: this.apiToken,
      type_document: 'dni',
      document_number: dto.document_number,
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, payload),
      );

      if (!data.success || !data.data) {
        throw new InternalServerErrorException(
          'No se pudo obtener los datos del DNI',
        );
      }

      const persona = data.data;

      return {
        dni: persona.number,
        nombres: persona.name.trim(),
        apellido_paterno: persona.first_last_name.trim(),
        apellido_materno: persona.second_last_name.trim(),
        fecha_nacimiento: persona.date_of_birth.substring(0, 10),
        genero: persona.gender === 'Masculino' ? 'Masculino' : 'Femenino',
        ubigeo: `${persona.department.trim()} - ${persona.province.trim()} - ${persona.district.trim()}`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al consultar el servicio RENIEC',
      );
    }
  }
}
