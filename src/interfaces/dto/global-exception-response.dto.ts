import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetailsDto {
    @ApiProperty({
        example: 'API-101',
        description: 'Código único para identificar el tipo de error.',
    })
    code!: string;

    @ApiProperty({
        example: 'Credenciales inválidas.',
        description: 'Mensaje descriptivo del error.',
    })
    message!: string;
}

export class GlobalExceptionResponseDto {
    @ApiProperty({
        example: 401,
        description: 'Código de estado HTTP de la respuesta.',
    })
    statusCode!: number;

    @ApiProperty({
        type: [ErrorDetailsDto],
        description: 'Detalles específicos del error.',
    })
    errors!: ErrorDetailsDto[];

    @ApiProperty({
        example: '/auth/login',
        description: 'La ruta de la solicitud que generó el error.',
    })
    path!: string;

    @ApiProperty({
        example: '2025-08-03T23:20:09.343Z',
        description: 'Marca de tiempo del error en formato ISO 8601.',
    })
    timestamp!: string;
}