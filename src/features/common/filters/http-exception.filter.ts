import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = exception.getResponse();

        let message = 'Unexpected error';
        let error = 'Error';

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
            const res: any = exceptionResponse;
            message = res.message || message;
            error = res.error || error;
        }

        response.status(status).json({
            status: 'error',
            message,
            error,
            statusCode: status,
        });
    }
}
