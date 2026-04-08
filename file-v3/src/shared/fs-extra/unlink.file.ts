import fs from 'fs-extra';

const deleteFile = async (filePath: string): Promise<void> => {

    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting ${filePath}: ${err.message}`);
                reject(err);
            } else {
                console.log(`Deleted ${filePath} successfully.`);
                resolve();
            }
        });
    });
    
};

export default deleteFile;
