import { Type } from "class-transformer";
import { UserInfoDto } from "./user-info.dto";
import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {

    @ApiProperty({
        description: 'Token de acceso JWT.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken!: string;

    @ApiProperty({
        description: 'Tiempo de expiración del token en minutos.',
        example: 15,
    })
    expiresIn!: number;

    @ApiProperty({
        description: 'Token de actualización (refresh token).',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    refreshToken!: string;

    @ApiProperty({
        description: 'Tipo de token.',
        enum: ['Bearer'],
        example: 'Bearer',
    })
    tokenType!: 'Bearer';

    @ApiProperty({
        description: 'Información del usuario autenticado.',
        type: UserInfoDto,
    })
    @Type(() => UserInfoDto)
    user!: UserInfoDto;

}
