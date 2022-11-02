import "global-jsdom/register";
import express from "express";
import multer from "multer";

import { forceGraph } from "./ForceGraph/ForceGraph.js";
import { forceTree } from "./ForceTree/ForceTree.js";
import { closenessCentrality } from "./Cytoscape/ClosenessCentrality.js";
import { cytoGraph } from "./Cytoscape/CytoGraph.js";
import { cytoGraphWeightJSON } from "./Cytoscape/CytoGraphWeightJSON.js";
import { cytoSnapGraph } from "./Cytoscape/Cytosnap.js";
import { checkConnection } from "./Database/database.js";
import { degreeCentrality } from "./Cytoscape/DegreeCentrality.js";
import { betweennessCentrality } from "./Cytoscape/BetweennessCentrality.js";
import { uploader } from "./Helpers/Upload.js";
import { CreateDataFile, CreateDataFilesTable, GetDataFileByID } from "./Database/datafileModel.js";
import { PuppeteerTest } from "./Cytoscape/Puppeteer.js";



const upload = multer({ 
  dest: "public/",
  fileFilter: function(_req, file, cb){
    checkFileType(file, cb);
  }
});
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

app.post("/upload", upload.single("data"), async(req, res) => {
  return res.send(await uploader(req.file));
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

app.get("/betweenness", async (req, res) => {
  return res.send(await betweennessCentrality());
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

app.get("/puppet", async (req, res) => {
  await PuppeteerTest()
  return res.send("Puppeteer running");
});

await checkConnection();
await CreateDataFilesTable();
// console.log(await CreateDataFile("Test", "json"));
// console.log(await GetDataFileByID(1));

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /json|csv/;
  // Check ext
  const extname = filetypes.test(getFileExtension(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: CSV or JSON only!');
  }
}

function getFileExtension(filename) {
  filename = filename.split(".");
  return filename[filename.length-1];
}

app.listen(3000, function () {
  console.log("Listening to port 3000 \n http://localhost:3000");
});
