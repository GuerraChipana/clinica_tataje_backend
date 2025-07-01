import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  // Interceptor global de formato de respuesta
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Clínica')
    .setDescription('Documentación de la API del sistema clínico')
    .setVersion('1.0')
    .addBearerAuth() // Si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document); // Disponible en /api

  await app.listen(process.env.PORT);
}
bootstrap();
