import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";

const body = window.document.getElementsByTagName("body")[0];
body.insertAdjacentHTML("afterbegin", `<div id="cy" style="width: 300px; height: 300px; display: block;"></div>`);

export async function cytoGraph(params) {
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

    console.log("CyWidth: ", cy.width());
    console.log("CyHeight: ", cy.height());
    const l = cy.layout({
        name: "random"
    }).run();

    console.log(body);
    return "";
}
