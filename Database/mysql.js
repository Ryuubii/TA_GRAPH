import { Sequelize } from "sequelize";

const db = new Sequelize("database", "username", "password", {
  dialect: "mysql",
});

export function getDB() {
  return db;
}

export async function checkConnection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
