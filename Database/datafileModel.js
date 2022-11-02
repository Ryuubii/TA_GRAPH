import { DataTypes, Model } from "sequelize";

import { getDB } from "./database.js";

const sequelize = getDB();

class DataFile extends Model {}

DataFile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filetype: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'DataFile' // We need to choose the model name
});

export async function CreateDataFilesTable() {
  try {
    await DataFile.sync();
    console.log("The table for the User model was just (re)created!");
  } catch (error) {
    console.log(error, "\nCouldn't create the DataFiles table!");
  }
}

export async function CreateDataFile(filename, filetype) {
  try {
    const df = await DataFile.create({ filename, filetype });
    return df.toJSON();
  } catch (error) {
    console.log("Error saving datafile to db: " + error)
    return JSON.stringify({
      message: "Could not save the file to db."
    })
  }
}

export async function GetDataFileByID(id) {
  try {
    const df = await DataFile.findByPk(id);
    return df.toJSON();
  } catch (error) {
    return JSON.stringify({
      message: "Could not file the requested file."
    })
  }
}

export async function GetMaxID() {
  try {
    const df = await DataFile.findOne({
      order: [
        ['id','DESC']
      ]
    });
    return df.toJSON();
  } catch (error) {
    return JSON.stringify({
      message: "Could not file the requested file."
    })
  }
}

// the defined model is the class itself
console.log(DataFile === sequelize.models.DataFile);