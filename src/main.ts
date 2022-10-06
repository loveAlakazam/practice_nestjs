import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // controller에서 타입을 원하는대로 바꿔줌.
    }), //유효성을 검사 & 정의된 컬럼 이외컬럼은 못하도록 막음.
  );

  await app.listen(3000);
}
bootstrap();
