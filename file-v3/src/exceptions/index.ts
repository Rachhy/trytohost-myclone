/**
 * Represents an HTTP Exception with a status code, message, and optional additional error information.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} message - The error message.
 * @param {number} code - The HTTP status code.
 * @param {T} [error] - Optional additional error information.
 */
export default class HttpException<T> extends Error {
    status_code: number;
    message: string;
    error?: T;

    constructor(message: string, code: number, error?: T) {
        super(message);
        this.status_code = code;
        this.message = message || 'This is a bad request.';
        this.error = error;
    }
}