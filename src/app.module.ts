import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ServicioReniecModule } from './modules/servicio-reniec/servicio-reniec.module';
import { PersonalClinicoModule } from './modules/personal_clinico/personal_clinico.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
