import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";

const body = window.document.getElementsByTagName("body")[0];
body.insertAdjacentHTML("afterbegin", `<div id="cy" style="width: 100%; height: 100%; display: block;"></div>`);
Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientWidth', {value: 1920});
Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', {value: 1080});
Object.defineProperty(document.getElementById('cy'), 'offsetWidth', {value: 1920});
Object.defineProperty(document.getElementById('cy'), 'offsetHeight', {value: 1080});

export async function cytoGraph(params) {
    console.log(document.getElementById('cy').offsetWidth);
    console.log(document.getElementById('cy'). offsetHeight);

    let cy = cytoscape({
        container: document.getElementById("cy"),
        fit: true,
        padding: 30,
        centerGraph: true,
    });
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    const eles = getEles(data);
    cy.add(eles);

    const markov = cy.elements().markovClustering();
    // cy.nodes().forEach( n => {
    //     console.log(n.data().position)
    // } );
    const l = cy.layout({
        name: "random"
    }).run();

    console.log(body);
    return "";
}
