import { Result } from "../../shared/core/Result";
import { AppErrorCode } from "../errors/app-error-code.error";

export enum UserTypeEnum {
    ADMIN = 'admin',
    USER = 'user',
}

export class UserType {
    private constructor(private readonly value: UserTypeEnum) { }

    public getValue(): UserTypeEnum {
        return this.value;
    }

    public static create(type: string): Result<UserType> {
        if (!Object.values(UserTypeEnum).includes(type as UserTypeEnum)) {
            return Result.fail(AppErrorCode.INVALID_USER_TYPE);
        }
        return Result.ok(new UserType(type as UserTypeEnum));
    }
}