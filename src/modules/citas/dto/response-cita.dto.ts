export class CitaResponseDto {
  id_cita: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
  id_paciente: {
    id_paciente: number;
    dni: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
  };
  id_medico: {
    id_medico: number;
    id_personal: {
      id_personal: number;
      nombres: string;
      apellido_paterno: string;
    };
    id_especialidad: {
      id_especialidad: number;
      nombre: string;
    };
  };
}
