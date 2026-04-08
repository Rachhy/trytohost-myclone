import fs from 'fs-extra';

const uploadImage = async (buffer: Buffer, folder: string, fileName: string): Promise<string> => {
    await fs.ensureDir(`public/uploads/${folder}`);
    const filePath = `public/uploads/${folder}/${fileName}`;
    await fs.writeFile(filePath, buffer);
    return filePath;
}

export default uploadImage;