import express from 'express';
import FileController from './controller';
import singleFileMulter from './multer';
import { UploadValidation } from './validation';

const fileRouter = express.Router();

fileRouter.get("/:filename",        FileController.read);
fileRouter.post("/upload-single",   singleFileMulter, FileController.upload);
fileRouter.post("/upload-base64",   UploadValidation, FileController.base64);

export default fileRouter;