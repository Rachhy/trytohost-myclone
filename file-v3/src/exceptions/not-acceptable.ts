import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 406 Not Acceptable exception with a customizable message and error detail.
 * This exception is used when the server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers, and the server is unwilling to supply a default representation.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Not acceptable'] - Optional custom error message. Defaults to 'Not acceptable' if not provided.
 * @param {string} [error='Not Acceptable'] - Optional custom error detail. Defaults to 'Not Acceptable' if not provided.
 */
export default class NotAcceptableException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Not acceptable', error: string = 'Not Acceptable') {
        super(message);
        this.status_code = HttpStatus.NOT_ACCEPTABLE;
        this.message = message;
        this.error = error;
    }
}