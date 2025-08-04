import { User } from "../../domain/entities/user.entity";
import { AppErrorCode } from "../../domain/errors/app-error-code.error";
import { IUserRepository } from "../../domain/repositories/user-repository.interface";
import { Email } from "../../domain/value-objects/email.value-object";
import { UserType } from "../../domain/value-objects/type-user.value-object";
import { Logger } from "../../infrastructure/logger/logger";
import { Result } from "../../shared/core/Result";
import { Injectable, Inject } from '@nestjs/common';

export interface CreateUserUseCaseParams {
    name: string;
    email: string;
    password: string;
    type: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) { }

    public async execute(params: CreateUserUseCaseParams): Promise<Result<User>> {
        const emailOrError = Email.create(params.email);
        if (emailOrError.isFailure) {
            Logger.debug('Email inválido al crear usuario');
            return Result.fail(AppErrorCode.INVALID_EMAIL);
        }

        const typeOrError = UserType.create(params.type);
        if (typeOrError.isFailure) {
            Logger.debug('Tipo de usuario inválido al crear usuario');
            return Result.fail(AppErrorCode.INVALID_USER_TYPE);
        }

        const exists = await this.userRepository.exists(params.email);
        if (exists) {
            Logger.debug('Intento de crear usuario con email ya existente');
            return Result.fail(AppErrorCode.EMAIL_ALREADY_EXISTS);
        }

        const userOrError = User.create({
            name: params.name,
            email: emailOrError.getValue(),
            password: params.password,
            type: typeOrError.getValue(),
        });

        if (userOrError.isFailure) {
            Logger.debug('Error creando entidad usuario');
            return Result.fail(AppErrorCode.INVALID_INPUT);
        }

        const user = userOrError.getValue();
        await this.userRepository.save(user);

        Logger.info('Usuario creado correctamente', { userId: user.id, email: user.email.getValue() });
        return Result.ok(user);
    }
}
