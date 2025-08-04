import { AppErrorCode } from "../../domain/errors/app-error-code.error";

export const AppErrorMessage: Record<AppErrorCode, string> = {
    [AppErrorCode.INVALID_CREDENTIALS]: 'Credenciales inválidas.',
    [AppErrorCode.INVALID_EMAIL]: 'Email invalido.',
    [AppErrorCode.INVALID_NAME]: 'El nombre es requerido',
    [AppErrorCode.INVALID_PASSWORD]: 'La contraseña es invalida',
    [AppErrorCode.EMAIL_ALREADY_EXISTS]: 'El correo ya está registrado.',
    [AppErrorCode.USER_NOT_FOUND]: 'Usuario no encontrado.',
    [AppErrorCode.INVALID_USER_TYPE]: 'Tipo de usuario invalido.',
    [AppErrorCode.INVALID_INPUT]: 'Entrada inválida.',
    [AppErrorCode.INTERNAL_ERROR]: 'Error interno del servidor.',
};
