import cytoscape from 'cytoscape';
import markovCluster from "cytoscape-markov-cluster";
import { readCsv } from "../Helpers/ReadCsv.js";
markovCluster(cytoscape);

export async function cyto(params) {
    var cy = cytoscape({});

    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    console.log(data);
}