import { Response } from "express";
import fs from 'fs-extra';
import BadRequestException from "../exceptions/bad-request";
import File from "../models/file.model";
import FilePayload from "../shared/files/payload.interface";
import sendFileResponse from "../shared/files/send.file";

class FileService {

    public read = async (filename: string, download: boolean, res: Response) => {
        try {
            const file = await File.findOne({
                where: {
                    filename: filename,
                }
            });
            if (!file) {
                throw new BadRequestException('Invalid file name');
            }
            fs.access(file.path, fs.constants.F_OK, (err) => {
                if (err) {
                    throw new BadRequestException('File not found.');
                }
                sendFileResponse(res, file, download);
            });
        } catch (error) {
            throw error;
        }
    }

    public upload = async (file: FilePayload) => {
        try {
            const uri: string = `api/file/${file.filename}`;
            const fileCreate = await File.create({
                filename: file.filename,
                originalname: file.originalname,
                mimetype: file.mimetype,
                path: file.path,
                size: file.size,
                encoding: file.encoding
            });
            const data = this.properties(uri, fileCreate)
            return {
                data,
                message: 'File has been uploaded successfully.'
            };
        } catch (error) {
            throw error;
        }
    }

    private properties(uri: string, file: File) {
        return {
            uri,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
        };
    }
}

export default new FileService();