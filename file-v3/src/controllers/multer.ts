import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import deleteFile from '../shared/fs-extra/unlink.file';
import renameFile from '../shared/fs-extra/rename.file';
import multerStorage from '../shared/fs-extra/storage.multer';
import BadRequestException from '../exceptions/bad-request';
import { ValidationRequest } from './validation';

// Configure multer for single file upload
const handleSingleFileUpload = multer({
    storage: multerStorage, // Custom storage configuration
    limits: {
        fileSize: 512 * 1024 * 1024, // Max file size (512MB)
        files: 1, // Limit to 1 file
    }
}).single('file'); // Specify the form field name

const singleFileMulter = (req: Request, res: Response, next: NextFunction) => {
    // Execute multer upload
    handleSingleFileUpload(req, res, async (error: multer.MulterError | any) => {
        try {
            // Handle multer-specific errors
            if (error instanceof multer.MulterError) {
                // Map of known multer errors to custom messages
                const errorMessages = {
                    LIMIT_FILE_SIZE: 'File size limit exceeded.',
                    LIMIT_UNEXPECTED_FILE: 'Field file is required.',
                    LIMIT_FILE_COUNT: 'Only one file allowed! Please select only one file.',
                };
                throw new BadRequestException(errorMessages[error.code] || 'Multer error.');
            } else if (error) {
                // Handle other errors
                throw new BadRequestException(`An unexpected error occurred: ${error.message}`);
            }
            
            if (!req.file) {
                // No file was uploaded
                throw new BadRequestException('No file uploaded! Please select a file.');
            }
            
            // Perform custom request validation (not shown)
            const validationError = ValidationRequest(req);
            if (validationError) {
                // Validation failed, delete the uploaded file
                deleteFile(req.file.path);
                throw new BadRequestException(validationError);
            }

            // Determine the destination directory for the file
            const sanitize = (text: string) => (text.replace(/[^\w]/gi, '') || 'unknown').toLowerCase();
            const folder = sanitize(req.body.folder); // Derived from request body
            const destinationFolder = `public/uploads//${folder}/`;
            await fs.ensureDir(destinationFolder); // Ensure the directory exists

            // Move the file to the target location
            const sourceFilePath = req.file.path;
            const targetFilePath = `${destinationFolder}${req.file.filename}`;
            await renameFile(sourceFilePath, targetFilePath);

            // Update request file properties to reflect new location
            req.file.path = targetFilePath;
            req.file.destination = destinationFolder;

            next(); // Proceed to the next middleware
        } catch (err) {
            // Pass any errors to the next error-handling middleware
            next(err);
        }
    });
};

export default singleFileMulter;
