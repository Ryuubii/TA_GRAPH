import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";

export async function closenessCentrality(params) {
    let cy = cytoscape({
        headless: true,
        container: window.document.body,
    });
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    const eles = getEles(data);
    cy.add(eles);

    let ccn = cy.elements().closenessCentralityNormalized({ /* my options */ });
    let closeness = []
    cy.nodes().forEach( n => {
        n.data({
            ccn: ccn.closeness( n )
        });
        closeness.push({
            id: n.data().id,
            ccn: ccn.closeness( n )
        })
    } );

    return closeness;
}
