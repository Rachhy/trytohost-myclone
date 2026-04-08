import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 501 Not Implemented exception with a customizable message and error detail.
 * This exception is used when the server does not support the functionality required to fulfill the request.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Not implemented'] - Optional custom error message. Defaults to 'Not implemented' if not provided.
 * @param {string} [error='Not Implemented'] - Optional custom error detail. Defaults to 'Not Implemented' if not provided.
 */
export default class NotImplementedException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Not implemented', error: string = 'Not Implemented') {
        super(message);
        this.status_code = HttpStatus.NOT_IMPLEMENTED;
        this.message = message;
        this.error = error;
    }
}