import { AppErrorCode } from "../../domain/errors/app-error-code.error";
import { IUserRepository } from "../../domain/repositories/user-repository.interface";
import { Logger } from "../../infrastructure/logger/logger";
import { Result } from "../../shared/core/Result";
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) { }

    public async execute(id: string): Promise<Result<void>> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            Logger.warn(`Intento de eliminar usuario no encontrado: ${id}`);
            return Result.fail(AppErrorCode.USER_NOT_FOUND);
        }

        await this.userRepository.delete(id);
        Logger.info(`Usuario eliminado correctamente: ${id}`);
        return Result.ok();
    }
}
