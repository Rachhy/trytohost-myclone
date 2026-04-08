import { HttpStatus } from "../shared/status";

/**
 * Represents a 502 Bad Gateway error. This exception is used when a server acting as a gateway
 * or proxy receives an invalid response from an upstream server.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Bad Gateway'] - The custom error message.
 * @param {string} [error='Bad Gateway'] - Additional detail about the error.
 */
export default class BadGatewayException extends Error {
    status_code: number;
    message: string;
    error: string;

    constructor(message: string = 'Bad Gateway', error: string = 'Bad Gateway') {
        super(message);
        this.status_code = HttpStatus.BAD_GATEWAY;
        this.message = message;
        this.error = error;
    }
}