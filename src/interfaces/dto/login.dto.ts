import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario para el login.',
        example: 'admin@spsgroup.com.br',
    })
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
    email!: string;

    @ApiProperty({
        description: 'Contraseña del usuario para el login.',
        example: '1234',
    })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    password!: string;
}
