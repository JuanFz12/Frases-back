import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

@Catch(TokenExpiredError, JsonWebTokenError)
export class JwtExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 401;
        let message = 'Invalid token';

        if (exception instanceof TokenExpiredError) {
            message = 'The reset link has expired';
        } else if (exception instanceof JsonWebTokenError) {
            message = 'Invalid token';
        }

        response.status(status).json({
            status: 'error',
            message,
            error: 'Unauthorized',
            statusCode: status,
        });
    }
}
