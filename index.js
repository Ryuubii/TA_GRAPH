import express from "express";
import neo4j from "neo4j-driver";

import { forceTree } from "./ForceTree/ForceTree.js"

const app = express();
app.use(express.urlencoded({extended:true}));

app.use('/static', express.static('public'))

app.get('/test', async(req, res) => {
    
    return res.send(await forceTree());
});

app.listen(3000, function () {
    console.log("Listening to port 3000 \n http://localhost:3000");
})