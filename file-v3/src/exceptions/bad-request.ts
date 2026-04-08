import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 400 Bad Request exception with a customizable message and error detail.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='This is a bad request.'] - Optional custom error message. Defaults to a generic bad request message if not provided.
 * @param {string} [error='Bad Request'] - Optional custom error detail. Defaults to 'Bad Request' if not provided.
 */
export default class BadRequestException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'This is a bad request.', error: string = 'Bad Request') {
        super(message);
        this.status_code = HttpStatus.BAD_REQUEST;
        this.message = message;
        this.error = error;
    }
}