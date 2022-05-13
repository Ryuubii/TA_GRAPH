import "global-jsdom/register";
import express from "express";
import neo4j from "neo4j-driver";

import { forceGraph } from "./ForceGraph/ForceGraph.js";
import { forceTree } from "./ForceTree/ForceTree.js";
import { closenessCentrality } from "./Cytoscape/ClosenessCentrality.js";
import { cytoGraph } from "./Cytoscape/CytoGraph.js";
import { cytoGraphWeightJSON } from "./Cytoscape/CytoGraphWeightJSON.js";
import { cytoSnapGraph } from "./Cytoscape/Cytosnap.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

app.get("/forcetree", async (req, res) => {
  return res.send(await forceTree());
});

app.get("/forcegraph", async (req, res) => {
  return res.send(await forceGraph());
});

app.get("/closeness", async (req, res) => {
  return res.send(await closenessCentrality());
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

app.listen(3000, function () {
  console.log("Listening to port 3000 \n http://localhost:3000");
});
