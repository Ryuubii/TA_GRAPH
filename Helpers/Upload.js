import fs from 'fs';
import { CreateDataFile, CreateDataFilesTable, GetDataFileByID, GetMaxID } from "../Database/datafileModel.js";
const uploadFolder = "public/";

function getFileExtension(filename) {
    filename = filename.split(".");
    return filename[filename.length-1];
}

export async function uploader(file) {
    const ext = getFileExtension(file.originalname)
    try{
        const id = await GetMaxID()
        const newName = `${id.id+1}.${ext}`;
        fs.renameSync(`${uploadFolder}/${file.filename}`,`${uploadFolder}/${newName}`);
        await CreateDataFile(newName, ext);
        console.log("test");
        return {
            id: parseInt(id.id)+1,
            msg: "Upload successful"
        }
    }
    catch(err){
        fs.unlinkSync(`${uploadFolder}/${file.filename}`);
        return "Upload failed";
    }
}