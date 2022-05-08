export function getEles(data) {
  let nodes = [];
  let edges = [];
  let i = 0;
  data.forEach(d => {
    Object.entries(d).forEach(([key, val]) => {
      if (nodes.indexOf(val.trim()) < 0) {
        nodes.push({ data: { id: val.trim() } })
      }
    });
    edges.push({
      data: {
        id: "e" + i.toString(),
        source: Object.values(d)[0],
        target: Object.values(d)[1],
      }
    });
    i++;
  });
  return {
    nodes,
    edges
  }
}
