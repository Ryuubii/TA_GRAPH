import "global-jsdom/register";
import express from "express";
import neo4j from "neo4j-driver";
import multer from "multer";
import fs from "fs";

import { forceGraph } from "./ForceGraph/ForceGraph.js";
import { forceTree } from "./ForceTree/ForceTree.js";
import { closenessCentrality } from "./Cytoscape/ClosenessCentrality.js";
import { cytoGraph } from "./Cytoscape/CytoGraph.js";
import { cytoGraphWeightJSON } from "./Cytoscape/CytoGraphWeightJSON.js";
import { cytoSnapGraph } from "./Cytoscape/Cytosnap.js";
import { checkConnection } from "./Database/database.js";
import { degreeCentrality } from "./Cytoscape/DegreeCentrality.js";
import { CreateDataFile, CreateDataFilesTable, GetDataFileByID } from "./Database/datafileModel.js";

const uploadFolder = "public/";
const upload = multer({ dest: "public/" });
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

app.post("/upload", upload.single("data"), async(req, res) => {
  
})

app.get("/forcetree", async (req, res) => {
  return res.send(await forceTree());
});

app.get("/forcegraph", async (req, res) => {
  return res.send(await forceGraph());
});

app.get("/closeness", async (req, res) => {
  return res.send(await closenessCentrality());
});

app.get("/degree", async (req, res) => {
  return res.send(await degreeCentrality());
});

app.get("/cg", async (req, res) => {
  return res.send(await cytoGraph());
});

app.get("/cgwj", async (req, res) => {
  return res.send(await cytoGraphWeightJSON());
});

app.get("/cng", async (req, res) => {
  return res.send(await cytoSnapGraph());
});


await checkConnection();
await CreateDataFilesTable();
console.log(await CreateDataFile("Test", "json"));
console.log(await GetDataFileByID(1));

app.listen(3000, function () {
  console.log("Listening to port 3000 \n http://localhost:3000");
});
