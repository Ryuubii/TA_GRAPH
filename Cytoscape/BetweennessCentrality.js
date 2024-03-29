import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";

export async function betweennessCentrality(params) {
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

    //Find the betweenness centrality of each node
    let bcn = cy.elements().betweennessCentrality();
    let betweenness = []
    cy.nodes().forEach( n => {
        n.data({
            bcn: bcn.betweenness( n )
        });
        //Push betweenness centrality of each node into an array
        betweenness.push({
            id: n.data().id,
            bcn: bcn.betweenness( n )
        })
    } );

    return betweenness;
}
