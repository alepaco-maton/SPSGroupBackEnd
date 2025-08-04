import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../../infrastructure/persistence/user.repository';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { GetUsersUseCase } from '../../application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        CreateUserUseCase,
        DeleteUserUseCase,
        GetUsersUseCase,
        UpdateUserUseCase,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },
    ],
    exports: [
        CreateUserUseCase,
        UserRepository,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },
    ]
})
export class UsersModule { }