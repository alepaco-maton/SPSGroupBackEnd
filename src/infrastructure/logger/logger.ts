export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}

export class Logger {
    static log(level: LogLevel, message: string, data?: any): void {
        const timestamp = new Date().toISOString();
        const logMsg = `[${timestamp}] [${level}] ${message}`;

        switch (level) {
            case LogLevel.INFO:
                console.info(logMsg);
                break;
            case LogLevel.WARN:
                console.warn(logMsg);
                break;
            case LogLevel.ERROR:
                console.error(logMsg);
                if (data) console.error('Detalles:', data);
                break;
            case LogLevel.DEBUG:
                console.debug(logMsg);
                if (data) console.debug('Detalles:', data);
                break;
            default:
                console.log(logMsg);
        }
    }

    static info(message: string, data?: any): void {
        this.log(LogLevel.INFO, message, data);
    }

    static warn(message: string, data?: any): void {
        this.log(LogLevel.WARN, message, data);
    }

    static error(message: string, data?: any): void {
        this.log(LogLevel.ERROR, message, data);
    }

    static debug(message: string, data?: any): void {
        this.log(LogLevel.DEBUG, message, data);
    }
}
