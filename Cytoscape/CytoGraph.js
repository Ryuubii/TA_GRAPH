import "jsdom-global/register.js";
import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";

export async function cytoGraph(params) {
    let cy = cytoscape({
        headless: true,
        container: window.document.body,
    });
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    const eles = getEles(data);
    cy.add(eles);

    const markov = cy.elements().markovClustering();
    // cy.nodes().forEach( n => {
    //     console.log(n.data().position)
    // } );

    return window.document.body.innerHTML;
}
