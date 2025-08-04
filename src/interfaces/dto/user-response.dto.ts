import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';

export class UserResponseDto {
    @ApiProperty({ description: 'ID único del usuario', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    id!: string;

    @ApiProperty({ description: 'Nombre completo del usuario', example: 'Juan Pérez' })
    name!: string;

    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'juan.perez@example.com' })
    email!: string;

    @ApiProperty({ description: 'Tipo de rol del usuario', example: 'user' })
    type!: string;

    public static fromEntity(user: User): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = user.id;
        dto.name = user.name;
        dto.email = user.email.getValue(); 
        dto.type = user.type.getValue();
        return dto;
    }
}