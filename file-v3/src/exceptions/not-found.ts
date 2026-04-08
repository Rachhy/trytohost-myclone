import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 404 Not Found exception with a customizable message and error detail.
 * This exception should be thrown when a requested resource could not be found but may be available in the future.
 * Subsequent requests by the client are permissible.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Not Found'] - Optional custom error message. Defaults to 'Not Found' if not provided, indicating the requested resource was not found.
 * @param {string} [error='Not Found'] - Optional custom error detail. Defaults to 'Not Found' if not provided, further explaining the nature of the not found error.
 */
export default class NotFoundException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Not Found', error: string = 'Not Found') {
        super(message);
        this.status_code = HttpStatus.NOT_FOUND;
        this.message = message;
        this.error = error;
    }
}