import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 409 Conflict exception with a customizable message and error detail.
 * This exception should be thrown when a request conflict with the current state of the server.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Conflict'] - Optional custom error message. Defaults to 'Conflict' if not provided.
 * @param {string} [error='Conflict'] - Optional custom error detail. Defaults to 'Conflict' if not provided.
 */
export default class ConflictException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Conflict', error: string = 'Conflict') {
        super(message);
        this.status_code = HttpStatus.CONFLICT;
        this.message = message;
        this.error = error;
    }
}