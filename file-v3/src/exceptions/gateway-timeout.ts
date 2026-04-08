import { HttpStatus } from "../shared/status";

/**
 * Represents an HTTP 504 Gateway Timeout exception with a customizable message and error detail.
 * This exception is used when a server acting as a gateway or proxy does not receive a timely response from an upstream server.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Gateway timeout'] - Optional custom error message. Defaults to 'Gateway timeout' if not provided.
 * @param {string} [error='Gateway Timeout'] - Optional custom error detail. Defaults to 'Gateway Timeout' if not provided.
 */
export default class GatewayTimeoutException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Gateway timeout', error: string = 'Gateway Timeout') {
        super(message);
        this.status_code = HttpStatus.GATEWAY_TIMEOUT;
        this.message = message;
        this.error = error;
    }
}