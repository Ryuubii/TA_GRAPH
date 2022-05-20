import fs from 'fs';
import { CreateDataFile, CreateDataFilesTable, GetDataFileByID, GetMaxID } from "../Database/datafileModel.js";
const uploadFolder = "public/";

export async function uploader(file) {
    try{
        const id = await GetMaxID()
        const newName = `${id.id+1}.${ext}`;
        fs.renameSync(`${uploadFolder}/${file.filename}`,`${uploadFolder}/${newName}`);
        console.log(await CreateDataFile(newName, newName));
        return "Upload successful"
    }
    catch(err){
        fs.unlinkSync(`${uploadFolder}/${file.filename}`);
        return "Upload failed";
    }
}