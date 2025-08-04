import { AppErrorCode } from '../../domain/errors/app-error-code.error';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { Result } from '../../shared/core/Result';
import { User } from '../../domain/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '../../infrastructure/logger/logger';

export interface LoginUseCaseParams {
    email: string;
    password: string;
}

@Injectable()
export class LoginUseCase {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) { }

    async execute(params: LoginUseCaseParams): Promise<Result<User | null>> {
        Logger.debug(`[LoginUseCase] Intentando login para: ${params.email}`);

        const user = await this.userRepository.findByEmail(params.email);
        if (!user) {
            Logger.debug(`[LoginUseCase] Usuario no encontrado: ${params.email}`);
            return Result.fail(AppErrorCode.INVALID_CREDENTIALS);
        }

        if (user.password !== params.password) {
            Logger.debug(`[LoginUseCase] Contraseña incorrecta para: ${params.email}`);
            return Result.fail(AppErrorCode.INVALID_CREDENTIALS);
        }

        return Result.ok(user);
    }
}
