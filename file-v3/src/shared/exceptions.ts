import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

// Import all exceptions
import BadGatewayException from '../exceptions/bad-gateway';
import BadRequestException from '../exceptions/bad-request';
import ConflictException from '../exceptions/conflict';
import ForbiddenException from '../exceptions/forbidden';
import GatewayTimeoutException from '../exceptions/gateway-timeout';
import InternalServerErrorException from '../exceptions/internal-server-error';
import NotAcceptableException from '../exceptions/not-acceptable';
import NotFoundException from '../exceptions/not-found';
import NotImplementedException from '../exceptions/not-implemented';
import RequestTimeoutException from '../exceptions/request-timeout';
import UnauthorizedException from '../exceptions/unauthorized';
import UnprocessableEntityException from '../exceptions/unprocessable-entity';

/**
 * @author Yim Klok <yimklok.kh@gmail.com>
 */
export class ErrorsFilter {
    static error(): ErrorRequestHandler {
        return (err: any, _req: Request, res: Response, _next: NextFunction) => {
            // Map each exception to its status code
            const exceptionMap = new Map<Function, number>([
                [BadGatewayException, 502],
                [BadRequestException, 400],
                [ConflictException, 409],
                [ForbiddenException, 403],
                [GatewayTimeoutException, 504],
                [InternalServerErrorException, 500],
                [NotAcceptableException, 406],
                [NotFoundException, 404],
                [NotImplementedException, 501],
                [RequestTimeoutException, 408],
                [UnauthorizedException, 401],
                [UnprocessableEntityException, 422],
            ]);

            // Find the status code for the current error
            const status_code = exceptionMap.get(err.constructor) || 500; // Default to 500 if error type is not in the map

            // Send the response
            return res.status(status_code).send({
                status_code: status_code,
                message: err?.message || 'Something when wrong',
                error: err?.error || undefined,
                errors: err?.errors || undefined
            });
        };
    }
}

export default ErrorsFilter;
