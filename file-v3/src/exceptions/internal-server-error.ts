import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 500 Internal Server Error exception with a customizable message and error detail.
 * This exception is used when the server encounters an unexpected condition that prevented it from fulfilling the request.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Internal server error'] - Optional custom error message. Defaults to 'Internal server error' if not provided.
 * @param {string} [error='Internal Server Error'] - Optional custom error detail. Defaults to 'Internal Server Error' if not provided.
 */
export default class InternalServerErrorException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Internal server error', error: string = 'Internal Server Error') {
        super(message);
        this.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
        this.message = message;
        this.error = error;
    }
}