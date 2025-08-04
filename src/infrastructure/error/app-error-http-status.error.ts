import { AppErrorCode } from "../../domain/errors/app-error-code.error";

export const AppErrorHttpStatus: Record<AppErrorCode, number> = {
    [AppErrorCode.INVALID_CREDENTIALS]: 401,
    [AppErrorCode.EMAIL_ALREADY_EXISTS]: 409,
    [AppErrorCode.USER_NOT_FOUND]: 404,
    [AppErrorCode.INVALID_USER_TYPE]: 400,
    [AppErrorCode.INVALID_EMAIL]: 400,
    [AppErrorCode.INVALID_NAME]: 400,
    [AppErrorCode.INVALID_PASSWORD]: 400,
    [AppErrorCode.INVALID_INPUT]: 400,
    [AppErrorCode.INTERNAL_ERROR]: 500,
};
