import { HttpStatus } from "../shared/status";

/**
 * Represents a 422 Unprocessable Entity error, indicating that the server cannot process the request.
 * This is typically used when the request is syntactically correct but fails semantic validation, such as
 * incorrect JSON values.
 * 
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Unprocessable Entity'] - The custom error message.
 * @param {string[]} [errors=[]] - An array of strings providing additional error details.
 */
export default class UnprocessableEntityException extends Error {
    status_code: number;
    message: string;
    errors: string[];

    constructor(message: string = 'Unprocessable Entity', errors: string[] = []) {
        super(message);
        this.status_code = HttpStatus.UNPROCESSABLE_ENTITY;
        this.message = message || 'Ok';
        this.errors = errors;
    }
}
