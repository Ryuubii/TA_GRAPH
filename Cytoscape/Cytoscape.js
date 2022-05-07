import "jsdom-global/register.js";
import cytoscape from "cytoscape";
import markovCluster from "cytoscape-markov-cluster";
import { readCsv } from "../Helpers/ReadCsv.js";
markovCluster(cytoscape);

export async function cyto(params) {
    var cy = cytoscape({
        headless: true,
        container: window,
    });
    var eles = [];
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    for (let i = 0; i < data.length; i++) {
        cy.add([
            {group: 'nodes', data: {id: data[i].mhs_nrp}},
            {group: 'nodes', data: {id: data[i].keg_kode}},
            {group: 'edges', data: {id: 'e'+i, source: data[i].mhs_nrp, target: data[i].keg_kode}}
        ])
    }

    var clusters = cy.elements().markovCluster({
        expandFactor: 2,        // affects time of computation and cluster granularity to some extent: M * M
        inflateFactor: 2,       // affects cluster granularity (the greater the value, the more clusters): M(i,j) / E(j)
        multFactor: 1,          // optional self loops for each node. Use a neutral value to improve cluster computations.
        maxIterations: 10,      // maximum number of iterations of the MCL algorithm in a single run
        // attributes: [           // attributes/features used to group nodes, ie. similarity values between nodes
        //     function(edge) {
        //         return edge.data('weight');
        //     }
        //     // ... and so on
        //  ]
    });

    return window.document.body.innerHTML;
}
