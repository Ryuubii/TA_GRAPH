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

    //Find the normalized degree centrality of each node
    let dcn = cy.elements().betweennessCentrality();
    let degree = []
    cy.nodes().forEach( n => {
        n.data({
            dcn: dcn.degree( n )
        });
        //Push normalized degree centrality of each node into an array
        degree.push({
            id: n.data().id,
            dcn: dcn.degree( n )
        })
    } );

    return degree;
}
