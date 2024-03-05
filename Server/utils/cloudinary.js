import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);

        return response;

    } catch (error) {
        return null;
    }
    finally {
        fs.unlinkSync(localFilePath, (unlinkError) => {
            if (unlinkError) {
                console.error("Error deleting local file:", unlinkError);
            }
        })
    }
}

export { uploadFile }