import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        description: 'Nuevo nombre completo del usuario.',
        example: 'Juan Carlos Pérez',
        required: true,
    })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres.' })
    name!: string;

    @ApiProperty({
        description: 'Nueva dirección de correo electrónico del usuario.',
        example: 'j.carlos.perez@example.com',
        required: true,
    })
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
    email!: string;

    @ApiProperty({
        description: 'Nueva contraseña para la cuenta del usuario.',
        example: 'nuevaPassword456',
        required: true,
    })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Length(6, 15, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password!: string;

    @ApiProperty({
        description: 'Nuevo tipo de rol del usuario.',
        enum: ['admin', 'user'],
        example: 'admin',
        required: true,
    })
    @IsNotEmpty({ message: 'El tipo de usuario no puede estar vacío.' })
    @IsIn(['admin', 'user'], { message: 'El tipo debe ser "admin" o "user".' })
    type!: string;
}