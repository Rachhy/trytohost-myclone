import { NextFunction, Request, Response } from "express";
import JsonResponseSuccess from "../shared/response";
import FileService from "./service";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import extractImageBuffer from "../shared/files/extract.buffer";
import FilePayload from "../shared/files/payload.interface";
import filePayload from "../shared/files/image.payload";
import BadRequestException from "../exceptions/bad-request";

class FileController {

    public read = async (req: Request, res: Response, next: NextFunction) => {

        const filename = req.params.filename;
        const download: boolean = req.query.download === 'true';
        try {
            return await FileService.read(filename, download, res);
        } catch (error) {
            next(error);
        }

    }

    public upload = async (req: Request, res: Response, next: NextFunction) => {

        try {
            return JsonResponseSuccess(res, await FileService.upload(req.file));
        } catch (error) {
            next(error);
        }

    }

    public base64 = async (req: Request, res: Response, next: NextFunction) => {

        const fileDir = 'public/uploads';
        const sanitize = (text: string): string => (text.replace(/[^\w]/gi, '') || 'unknown').toLowerCase();

        const verifyFile = async (filePath: string): Promise<boolean> => {
            try {
                const fileBuffer = await fs.readFile(filePath);
                return fileBuffer && fileBuffer.length > 0;
            } catch (readError) {
                console.error('Failed to read file for verification', readError);
                return false; // Return false to indicate the verification failed
            }
        }

        try {
            await fs.ensureDir(fileDir);
            const folder = sanitize(req.body.folder);
            const buffer = extractImageBuffer(req.body.image);
            const destinationFolder = `${fileDir}/${folder}`;
            const fileName = uuidv4();
            const filePath = `${destinationFolder}/${fileName}`;

            await fs.mkdir(destinationFolder, { recursive: true });
            await fs.writeFile(filePath, buffer);

            if (await verifyFile(filePath)) {
                const file: FilePayload = filePayload(fileName, filePath, buffer);
                return JsonResponseSuccess(res, await FileService.upload(file));
            } else {
                await fs.unlink(filePath).catch(e => console.error('Failed to delete unverified file', e));
                throw new BadRequestException('File verification failed. The file might be corrupted or inaccessible.');
            }
        } catch (error) {
            next(error);
        }
    }

}

export default new FileController();