import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";

export async function closenessCentrality(params) {
    //Initialize Cytoscape graph
    let cy = cytoscape({
        headless: true,
        container: window.document.body,
    });
    //Read CSV file as JSON data
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    //Convert JSON data into array
    const eles = getEles(data);
    //Add the data array into cytoscape graph
    cy.add(eles);

    //Find the normalized closeness centrality of each node
    let ccn = cy.elements().closenessCentralityNormalized({ /* my options */ });
    let closeness = []
    cy.nodes().forEach( n => {
        n.data({
            ccn: ccn.closeness( n )
        });
        //Push normalized closeness centrality of each node into an array
        closeness.push({
            id: n.data().id,
            ccn: ccn.closeness( n )
        })
    } );

    return closeness;
}
