import { NextFunction, Request, Response } from 'express';
import { ValidationError, body, validationResult } from 'express-validator';
import UnprocessableEntityException from '../exceptions/unprocessable-entity';

const regex = /^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/;

export const UploadValidation = [
    // Field name
    body('folder').notEmpty().withMessage('Folder is required')
        .isString().withMessage('Folder must be a string')
        .isLength({ min: 2 }).withMessage('Folder must be at least 2 characters long')
        .matches(/^[A-Za-z0-9-]+$/).withMessage('Folder can only contain alphanumeric characters and hyphens'),
    // Field image
    body('image')
        .notEmpty().withMessage('Image is required')
        .matches(regex).withMessage('Image must be a valid base64'),

    // Middleware to check the result of the validation above
    async (req: Request, _res: Response, next: NextFunction) => {
        try {
            // Check validate fields
            const errors: ValidationError[] = validationResult(req).array();
            if (errors.length) {
                return next(new UnprocessableEntityException("Invalid Entity", errors.map((error) => error.msg)));
            }
            next();
        } catch (error) {
            next(error);
        }
    }
];


export const ValidationRequest = (req: Request) => {

    if (!req.body.folder) {
        return 'Field folder is required!';
    }
    else if (!/^[A-Za-z0-9-]+$/.test(req.body.folder)) {
        return 'Field folder is invalid!';
    }
    return null;
};