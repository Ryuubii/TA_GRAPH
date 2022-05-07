export function getNodesAndLinks(data) {
  let links = [];
  let nodes = [];
  data.forEach((d) => {
    if (nodes.indexOf(d.mhs_nrp.trim()) < 0) {
      nodes.push({ name: d.mhs_nrp.trim(), group: 1 });
    }
    if (nodes.indexOf(d.keg_kode.trim()) < 0) {
      nodes.push({ name: d.keg_kode.trim(), group: 2 });
    }
    links.push({
      source: nodes.map((object) => object.name).indexOf(d.mhs_nrp.trim()),
      target: nodes.map((object) => object.name).indexOf(d.keg_kode.trim()),
    });
  });

  return {
    nodes: nodes,
    links: links,
  };
}
