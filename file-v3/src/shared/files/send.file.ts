import { Response } from 'express';
import * as fileSystem from 'fs';
import File from "../../models/file.model";
import BadRequestException from '../../exceptions/bad-request';

const sendFileResponse = async (res: Response, file: File, download: boolean) => {
    // Set headers for both download and non-download responses
    const headers = {
        'Content-Type': file.mimetype,
        'Content-Length': file.size.toString(), // Ensure Content-Length is a string
    };

    // If the file is to be downloaded, adjust the content disposition header
    if (download) {
        headers['Content-Disposition'] = `attachment; filename="${file.originalname}"`; // Correct header key and use quotes around filename
    }

    try {
        res.writeHead(200, headers); // Set headers for the response
        const readStream = fileSystem.createReadStream(file.path);

        readStream.on('error', (err) => {
            throw new BadRequestException(err.message || 'Error while reading the file');
        });

        // Pipe the read stream to the response object
        readStream.pipe(res);
    } catch (err) {
        throw new BadRequestException(err.message || 'Error while setting up the file response');
    }
};

export default sendFileResponse;
