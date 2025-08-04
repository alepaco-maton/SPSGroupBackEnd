import { AppErrorCode } from '../../domain/errors/app-error-code.error';
import { AppErrorHttpStatus } from './app-error-http-status.error';
import { AppErrorMessage } from './app-error-message.error';

export function handleError(errorCode: string) {
    const code = errorCode as AppErrorCode;
    const message = AppErrorMessage[code] || 'Ocurrió un error desconocido.';
    const statusCode = AppErrorHttpStatus[code] || 500;
    return { errorCode: code, message, statusCode };
}
