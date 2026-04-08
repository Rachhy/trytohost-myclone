import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 408 Request Timeout exception with a customizable message and error detail.
 * This exception is used when a server closes a network connection because the client did not complete the request within the server's allotted timeout period.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Request timeout'] - Optional custom error message. Defaults to 'Request timeout' if not provided.
 * @param {string} [error='Request Timeout'] - Optional custom error detail. Defaults to 'Request Timeout' if not provided.
 */
export default class RequestTimeoutException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Request timeout', error: string = 'Request Timeout') {
        super(message);
        this.status_code = HttpStatus.REQUEST_TIMEOUT;
        this.message = message;
        this.error = error;
    }
}