import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './interfaces/filters/http-exception.filter';
import { AppModule } from './interfaces/modules/app.module';
import cors from 'cors';
import morgan from 'morgan';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cors());
    app.use(morgan('dev'));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());

    const config = new DocumentBuilder()
        .setTitle('API Users')
        .setDescription('Documentación Swagger de la API')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/v1/docs', app, document);

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();

