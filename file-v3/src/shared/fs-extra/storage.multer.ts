import multer from 'multer';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

const multerStorage = multer.diskStorage({

    destination: async (_req, _file, callback) => {
        // Create the public folder if it doesn't exist
        await fs.ensureDir('public/uploads');
        // Do not process the destination logic here
        callback(null, 'public/');
    },
    filename: (_req, _file, callback) => {
        callback(null, uuidv4());
    }

});

export default multerStorage;