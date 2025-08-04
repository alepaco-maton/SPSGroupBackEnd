import { Result } from "../../shared/core/Result";
import { AppErrorCode } from "../errors/app-error-code.error";

export class Email {
    private readonly value: string;

    constructor(email: string) {
        if (!Email.isValid(email)) {
            throw new Error('Invalid email format');
        }
        this.value = email;
    }

    public getValue(): string {
        return this.value;
    }

    public static isValid(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    public static create(email: string): Result<Email> {
        if (!this.isValid(email)) {
            return Result.fail(AppErrorCode.INVALID_EMAIL);
        }
        return Result.ok(new Email(email));
    }
}