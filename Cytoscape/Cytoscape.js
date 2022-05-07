import cytoscape from 'cytoscape';
import markovCluster from 'cytoscape-markov-cluster';
import fs from 'fs';
markovCluster(cytoscape);

export async function cyto(params) {
    var cy = cytoscape({});

    fs.readFile('/public/datakegiatanorganisasimhs_2016-2020.csv', 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
        // Your array contains ['ID', 'D11', ... ]
        console.log(data);
    });
    
}