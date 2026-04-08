import FilePayload from "./payload.interface";

const filePayload = (fileName: string, filePath: string, buffer: Buffer): FilePayload => {

    return {
        fieldname: 'image',
        filename: fileName,
        originalname: `${fileName}.jpg`,
        mimetype: 'image/jpeg',
        destination: filePath,
        path: filePath,
        size: buffer.length,
        encoding: 'from-base64'
    };

}

export default filePayload;