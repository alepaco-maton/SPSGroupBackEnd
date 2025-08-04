import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user-repository.interface";
import { Logger } from "../../infrastructure/logger/logger";
import { Result } from "../../shared/core/Result";
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetUsersUseCase {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) { }

    public async execute(): Promise<Result<User[]>> {
        const users = await this.userRepository.list();
        Logger.info(`Se listaron ${users.length} usuarios`);
        return Result.ok(users);
    }
}
