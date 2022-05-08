import "jsdom-global/register.js";
import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getNodesAndLinks } from "../Helpers/GetNodesAndLinks.js";
import { getEles } from "../Helpers/GetEles.js";

export async function cyto(params) {
    let cy = cytoscape({
        headless: true,
        container: window.document.body,
    });
    let elesNode = [];
    let elesLink = [];
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    const eles = getEles(data);
    console.log(eles);
    // nodes.forEach((node) => {
    //     // cy.add({group: 'nodes', data: {id: node.name}});
    //     elesNode.push(node.name);
    //     console
    // })
    // var ctr = 0;
    // links.forEach((link) => {
    //     // cy.add({group: 'edges', data: {id: 'e'+ctr, source: link.source, target: link.target}});
    //     elesLink.push({
    //         id: 'e'+ctr,
    //         source: link.source,
    //         target: link.target
    //     })
    //     ctr++;
    // })

    let ccn = cy.elements().closenessCentralityNormalized({ /* my options */ });

    cy.nodes().forEach( n => {
    n.data({
        ccn: ccn.closeness( n )
    });
    } );

    // return cy.data();
    console.log(elesNode);
    console.log("LINKS")
    console.log(elesLink);
    return elesNode;
}
