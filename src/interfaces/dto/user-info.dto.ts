import { ApiProperty } from "@nestjs/swagger";

export class UserInfoDto {
    @ApiProperty({ description: 'ID único del usuario.', example: '0150d925-05f0-4a81-9af2-1f5b08224290' })
    id!: string;

    @ApiProperty({ description: 'Correo electrónico del usuario.', example: 'usuario@example.com' })
    email!: string;

    @ApiProperty({ description: 'Tipo de usuario.', example: 'user' })
    type!: string;
}
