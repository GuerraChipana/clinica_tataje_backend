import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // Aplicar el interceptor globalmente
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  await app.listen(process.env.PORT);
}
bootstrap();
