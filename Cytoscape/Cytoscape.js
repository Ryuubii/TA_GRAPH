import "jsdom-global/register.js";
import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getNodesAndLinks } from "../Helpers/GetNodesAndLinks.js";

export async function cyto(params) {
    var cy = cytoscape({
        headless: true,
        container: window.document.body,
    });
    var eles = [];
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    const { nodes, links } = getNodesAndLinks(data);
    nodes.forEach((node) => {
        cy.add({group: 'nodes', data: {id: node.name}});
    })
    var ctr = 0;
    links.forEach((link) => {
        cy.add({group: 'edges', data: {id: 'e'+ctr, source: link.source, target: link.target}});
        ctr++;
    })

    let ccn = cy.elements().closenessCentralityNormalized({ /* my options */ });

    cy.nodes().forEach( n => {
    n.data({
        ccn: ccn.closeness( n )
    });
    } );

    return cy.data();
}
