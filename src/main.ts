import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionsFilter } from './common/filters/http.exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that don't have decorators
      forbidNonWhitelisted: true, // throws if unknown properties exist
      transform: true, // transforms payloads to DTO instances
    }),
  );

  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
