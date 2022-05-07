import cytoscape from "cytoscape";
import markovCluster from "cytoscape-markov-cluster";
import { readCsv } from "../Helpers/ReadCsv.js";
markovCluster(cytoscape);

export async function cyto(params) {
  var cy = cytoscape({});

  const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
  for (let i = 0; i < data.length; i++) {
      cy.add([
          {group: 'nodes', data: {id: data[i].mhs_nrp}},
          {group: 'nodes', data: {id: data[i].keg_kode}},
          {group: 'edges', data: {id: 'e'+i, source: data[i].mhs_nrp, target: data[i].keg_kode}}
      ])
  }

  var clusters = cy.elements().markovCluster();

  return clusters;
}
