import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";
import { stringify } from 'flatted';

const body = window.document.getElementsByTagName("body")[0];
body.insertAdjacentHTML("afterbegin", `<div id="cy" style="width: 100%; height: 100%; display: block;"></div>`);
Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientWidth', {value: 1920});
Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', {value: 1080});
Object.defineProperty(document.getElementById('cy'), 'offsetWidth', {value: 1920});
Object.defineProperty(document.getElementById('cy'), 'offsetHeight', {value: 1080});

export async function cytoGraph(params) {
    console.log(document.getElementById('cy').offsetWidth);
    console.log(document.getElementById('cy').offsetHeight);

    //Initialize Cytoscape
    let cy = cytoscape({
        // container: document.getElementById("cy"),
        fit: true,
        padding: 30,
        centerGraph: true,
    });
    //Read CSV file as JSON data
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    //Convert JSON data into array
    const eles = getEles(data);
    console.log(data);
    //Add the data array into cytoscape graph
    cy.add(eles);

    //Perform Markov clustering to cytoscape graph
    const markov = cy.elements().markovClustering();
    // console.log(markov);
    //Convert markov clustering graph into JSON
    const jsonified = stringify(markov)
    const l = await cy.layout({
        name: "random"
    }).run();

    // console.log(body);
    return jsonified;
}
