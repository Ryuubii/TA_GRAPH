export function getEles(data) {
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
