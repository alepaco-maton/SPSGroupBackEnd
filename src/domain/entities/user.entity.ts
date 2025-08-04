import { Result } from '../../shared/core/Result';
import { AppErrorCode } from '../errors/app-error-code.error';
import { Email } from '../value-objects/email.value-object';
import { UserType } from '../value-objects/type-user.value-object';

interface UserProps {
    name: string;
    email: Email;
    password: string;
    type: UserType;
}

export class User {
    private constructor(
        public readonly id: string,
        public name: string,
        public email: Email,
        public password: string,
        public type: UserType
    ) { }

    public static create(props: UserProps, id?: string): Result<User> {
        if (!props.name || props.name.trim().length === 0 || props.name.trim().length < 3 || props.name.trim().length > 50) {
            return Result.fail(AppErrorCode.INVALID_NAME);
        }
        if (!props.password || props.password.length < 4 || props.password.length > 15) {
            return Result.fail(AppErrorCode.INVALID_PASSWORD);
        }
        if (!props.email) {
            return Result.fail(AppErrorCode.INVALID_EMAIL);
        }
        if (!props.type) {
            return Result.fail(AppErrorCode.INVALID_USER_TYPE);
        }

        const userId = id ?? crypto.randomUUID();

        const user = new User(
            userId,
            props.name,
            props.email,
            props.password,
            props.type
        );

        return Result.ok(user);
    }

    public updateName(name: string): Result<void> {
        if (!name || name.trim().length === 0 || name.trim().length < 3 || name.trim().length > 50) {
            return Result.fail(AppErrorCode.INVALID_NAME);
        }

        this.name = name;
        return Result.ok();
    }
}
