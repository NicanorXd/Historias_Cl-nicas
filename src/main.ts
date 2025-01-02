import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { patchNestjsSwagger, ZodValidationPipe } from '@anatine/zod-nestjs';
import { HttpExceptionFilter } from './shared/http/infrastructure/filters/http.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nMiddleware } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(I18nMiddleware);

  const config = app.get(ConfigService);

  app.enableCors({ origin: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ transform: true }),
    new ZodValidationPipe(),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swagger = new DocumentBuilder()
    .setTitle('Coin Back')
    .setVersion('1.0')
    .build();

  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(+config.get('PORT', 3000));
}
bootstrap();
