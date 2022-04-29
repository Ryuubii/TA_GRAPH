import express from "express"
import * as d3 from "d3"
import jsdom from "jsdom"
import neo4j from "neo4j-driver"
const app = express();
import fs from "fs"
const { JSDOM } = jsdom;
app.use(express.urlencoded({extended:true}));

async function forceTree(params) {
    const data = d3.csv("/datakegiatanorganisasimhs_2016-2020.csv");
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants(); 
  
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("x", d3.forceX())
        .force("y", d3.forceY());
  
    const body = d3.select(fakeDom.window.document).select('body'); 
    const svg = body.append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
  
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");
  
    const node = svg.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("fill", d => d.children ? null : "#000")
        .attr("stroke", d => d.children ? null : "#fff")
        .attr("r", 3.5)
        .call(drag(simulation));
  
    node.append("title")
        .text(d => d.data.name);
  
    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });
  
    return svg.node();
}

function csvToJSON() {
    csv = fs.readFileSync("datakegiatanorganisasimhs_2016-2020.csv")

    const array = csv.toString().split("\n");

    /* Store the converted result into an array */
    const csvToJsonResult = [];

    /* Store the CSV column headers into seprate variable */
    const headers = array[0].split(",")

    /* Iterate over the remaning data rows */
    for (let i = 1; i < array.length - 1; i++) {
        /* Empty object to store result in key value pair */
        const jsonObject = {}
        /* Store the current array element */
        const currentArrayString = array[i]
        let string = ''

        let quoteFlag = 0
        for (let character of currentArrayString) {
            if (character === '"' && quoteFlag === 0) {
                quoteFlag = 1
            }
            else if (character === '"' && quoteFlag == 1) quoteFlag = 0
            if (character === ',' && quoteFlag === 0) character = '|'
            if (character !== '"') string += character
        }

        let jsonProperties = string.split("|")

        for (let j in headers) {
            if (jsonProperties[j].includes(",")) {
            jsonObject[headers[j]] = jsonProperties[j]
                .split(",").map(item => item.trim())
            }
            else jsonObject[headers[j]] = jsonProperties[j]
        }
        /* Push the genearted JSON object to resultant array */
        csvToJsonResult.push(jsonObject)
    }
    /* Convert the final array to JSON */
    // const json = JSON.stringify(csvToJsonResult);
    const json = csvToJsonResult;
    // console.log(json)
    return json;
}

app.post('/api/uploadData', async(req, res) => {
    
});

app.get('/test', async(req, res) => {
    
    return res.send(forceTree());
});

app.listen(3000, function () {
    console.log("Listening to port 3000");
})