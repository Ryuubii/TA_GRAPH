
function getEles(data) {
  let nodes = [];
  let edges = [];
  let i = 0;
  let j = 0;
  data.forEach(d => {
    j = 1;
    Object.entries(d).forEach(([key, val]) => {
      val = (typeof val === "number") ? val : val.trim()
      if (nodes.indexOf(val) < 0) {
        if(nodes.key !== "weight" || j != 3) {
          nodes.push({ group: "nodes", data: { id: val } })
        }
      }
      j++;
    });
    edges.push({
      group: "edges",
      data: {
        id: "e" + i.toString(),
        source: Object.values(d)[0],
        target: Object.values(d)[1],
        ...((Object.values(d)[2] || Object.values(d)[2] != null || Object.values(d)[2] == "weight") ? { weight: Object.values(d)[2] } : {}) 
      }
    });
    i++;
  });
  return {
    nodes,
    edges
  }
}

async function run(csvUrl) {
  Papa.parse(csvUrl, {
    download: true,
    complete: results => {
      renderGraph(results)
    }
  })
}

function renderGraph(results) {
  const eles = getEles(results.data.slice(1,-1))
  let cy = cytoscape({
    container: document.querySelector("#cy"),
    fit: true,
    padding: 30,
    centerGraph: true,
  });

  cy.add(eles)
  
  
  cy.elements().markovClustering();
  cy.layout({
    name: "cose",
  }).run();  
  
  
}


await run("https://raw.githubusercontent.com/Ryuubii/TA_GRAPH/main/public/datakegiatanorganisasimhs_2016-2020.csv");

