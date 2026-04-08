import { Response } from "express";
import { HttpStatus } from "./status";

/**
 * Enhances the response to include a status_code if it's not already present.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param res - The Express response object.
 * @param data - The data to be sent in the response, which may not include a status_code.
 */
const JsonResponseSuccess = <T>(res: Response, data: T) => {
    res.status(HttpStatus.OK).json({
        status_code: HttpStatus.OK,
        ...data,
    });
};

export default JsonResponseSuccess;
