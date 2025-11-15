
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,

} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response, Request } from 'express';
@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Unexpected error';
        let error = 'Internal Server Error';

        switch (exception.code) {
            case 'P2000':
                status = HttpStatus.BAD_REQUEST;
                let column = 'column';
                if (exception.meta && typeof exception.meta === 'object') {
                    column = (exception.meta as any).column_name || column;
                }
                message = `The provided value is too long for the column.: ${column}`;
                error = 'Bad Request';
                break;
            case 'P2002':
                status = HttpStatus.BAD_REQUEST;
                let field = 'single field';
                let value = 'unknown';

                if (
                    exception.meta &&
                    typeof exception.meta === 'object' &&
                    Array.isArray((exception.meta as any).target)
                ) {
                    const targetFields = (exception.meta as any).target;
                    field = targetFields.join(', ');

                    if (request?.body && typeof request.body === 'object') {
                        const fieldValues = targetFields.map(
                            (key: string) => `${key}=${request.body[key] ?? 'not sent'}`
                        );
                        value = fieldValues.join(', ');
                    }
                }

                message = `A record with the field value already exists: ${field} (${value})`;
                error = 'Conflict';
                break;
            case 'P2025':
                status = HttpStatus.NOT_FOUND;
                message = `Record not found`;
                error = 'Not Found';
                break;
            default:
                message = exception.message;
                break;
        }

        response.status(status).json({
            status: 'error',
            message,
            error,
            statusCode: status,
        });
    }
}