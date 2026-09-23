import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';

import { getMongoURL } from '../database/db.js';

dotenv.config();

const storage = new GridFsStorage({
    url: getMongoURL(),
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-file-${file.originalname}`;
        }

        return {
            bucketName: "fs",
            filename: `${Date.now()}-file-${file.originalname}`
        };
    }
});

export default multer({storage});