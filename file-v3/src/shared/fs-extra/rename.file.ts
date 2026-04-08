import fs from 'fs-extra';

const renameFile = async (sourceFilePath: string, targetFilePath: string) => {

    try {
        await fs.rename(sourceFilePath, targetFilePath);
    } catch (err) {
        console.error('Error moving file:', err);
        throw new Error('Error while saving the file.');
    }
    
}

export default renameFile;