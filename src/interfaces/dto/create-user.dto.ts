import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre completo del usuario.',
        example: 'Juan Pérez',
        minLength: 3,
        maxLength: 50,
    })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres.' })
    name!: string;

    @ApiProperty({
        description: 'Dirección de correo electrónico del usuario.',
        example: 'juan.perez@example.com',
    })
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
    email!: string;

    @ApiProperty({
        description: 'Contraseña para la cuenta del usuario.',
        example: 'passwordSeguro123',
        minLength: 4,
    })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Length(4, 15, { message: 'La contraseña debe tener al menos 4 caracteres.' })
    password!: string;

    @ApiProperty({
        description: 'Tipo de rol del usuario.',
        enum: ['admin', 'user'],
        example: 'user',
    })
    @IsNotEmpty({ message: 'El tipo de usuario no puede estar vacío.' })
    @IsIn(['admin', 'user'], { message: 'El tipo debe ser "admin" o "user".' })
    type!: string;
}
