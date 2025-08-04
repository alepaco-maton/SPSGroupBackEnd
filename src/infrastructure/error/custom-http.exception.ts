import { HttpException } from '@nestjs/common';

export class CustomHttpException extends HttpException {
    constructor(
        readonly errorCode: string,
        readonly errorMessage: string,
        readonly statusCode: number,
    ) {
        super(
            [{
                code: errorCode,
                message: errorMessage,
            }],
            statusCode,
        );
    }
}
