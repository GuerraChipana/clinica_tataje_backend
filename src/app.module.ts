import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ServicioReniecModule } from './modules/servicio-reniec/servicio-reniec.module';
import { PersonalClinicoModule } from './modules/personal_clinico/personal_clinico.module';
import { AuthModule } from './modules/auth/auth.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';
import { InformacionMedicaModule } from './modules/informacion_medica/informacion_medica.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [join(__dirname, '**/*.entity{.ts,.js}')],
        synchronize: false,
      }),
    }),
    ServicioReniecModule,
    PersonalClinicoModule,
    AuthModule,
    PacientesModule,
    InformacionMedicaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
