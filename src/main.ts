import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { version } from '../package.json';
import { config } from './config';
import { ValidationPipe } from '@nestjs/common';

function buildDocs(app) {
  const options = new DocumentBuilder()
    .setTitle('Bot Management API')
    .setDescription('Bot Management API Docs')
    .setVersion(version)
    .addBearerAuth();

  options.addServer(config.swaggerServerUrl);

  return SwaggerModule.createDocument(app, options.build(), { ignoreGlobalPrefix: true });
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');

  // Generate swagger schema
  const doc = buildDocs(app);

  // output swagger schema to json file and exit
  fs.writeFileSync(`./${config.swaggerSchemaName}.json`, JSON.stringify(doc));
  // Logger.log(`Swagger schema exported to ${config.swaggerSchemaName}.json file`, 'Swagger');

  // serve on a /swagger path
  SwaggerModule.setup('swagger', app, doc);

  // adding validation pipes for class-validators error messages
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // to transform payload according to DTO classes
    forbidUnknownValues: true
  }));
  
  await app.listen(config.port);
}

bootstrap();
