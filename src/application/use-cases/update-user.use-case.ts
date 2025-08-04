import { User } from "../../domain/entities/user.entity";
import { AppErrorCode } from "../../domain/errors/app-error-code.error";
import { IUserRepository } from "../../domain/repositories/user-repository.interface";
import { Email } from "../../domain/value-objects/email.value-object";
import { UserType } from "../../domain/value-objects/type-user.value-object";
import { Logger } from '../../infrastructure/logger/logger';
import { Result } from "../../shared/core/Result";
import { Injectable, Inject } from '@nestjs/common';

export interface UpdateUserUseCaseParams {
    name: string;
    email: string;
    password: string;
    type: string;
}

@Injectable()
export class UpdateUserUseCase {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) { }

    public async execute(id: string, params: UpdateUserUseCaseParams): Promise<Result<User>> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            Logger.warn(`Intento de actualizar usuario no encontrado: ${id}`);
            return Result.fail(AppErrorCode.USER_NOT_FOUND);
        }

        if (params.email && params.email !== user.email.getValue()) {
            const emailOrError = Email.create(params.email);
            if (emailOrError.isFailure) {
                Logger.warn('Email inválido en actualización de usuario');
                return Result.fail(AppErrorCode.INVALID_EMAIL);
            }

            const emailExists = await this.userRepository.exists(params.email);
            if (emailExists) {
                Logger.warn('Intento de actualizar con email ya existente');
                return Result.fail(AppErrorCode.EMAIL_ALREADY_EXISTS);
            }

            user.email = emailOrError.getValue();
        }

        if (params.type) {
            const typeOrError = UserType.create(params.type);
            if (typeOrError.isFailure) {
                Logger.warn('Tipo inválido en actualización de usuario');
                return Result.fail(AppErrorCode.INVALID_USER_TYPE);
            }
            user.type = typeOrError.getValue();
        }

        if (params.name) user.name = params.name;
        if (params.password) user.password = params.password;

        await this.userRepository.update(user);

        Logger.info(`Usuario actualizado correctamente: ${id}`);
        return Result.ok(user);
    }
}
