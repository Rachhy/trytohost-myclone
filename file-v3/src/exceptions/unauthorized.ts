import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 401 Unauthorized exception with a customizable message and error detail.
 * This exception is used when authentication is required and has failed or has not yet been provided.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Unauthorized'] - Optional custom error message. Defaults to 'Unauthorized' if not provided.
 * @param {string} [error='Unauthorized'] - Optional custom error detail. Defaults to 'Unauthorized' if not provided.
 */
export default class UnauthorizedException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Unauthorized', error: string = 'Unauthorized') {
        super(message);
        this.status_code = HttpStatus.UNAUTHORIZED;
        this.message = message;
        this.error = error;
    }
}