import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  if(process.env.APP_ENV!="production"){
    app.enableCors({
      allowedHeaders: '*',
      origin: '*',
      credentials: true,
    });
  }
  await app.listen(3000);
}
bootstrap();