import * as d3 from "d3";
import jsdom from "jsdom";

import { getData } from "../Helpers/GetData.js";
import { getNodesAndLinks } from "../Helpers/GetNodesAndLinks.js";

const { JSDOM } = jsdom;
const linkStrokeColor = "#999",
  linkStrokeOpacity = 0.6,
  linkStrokeWidth = 1,
  linkStrokeLinecap = "round",
  nodeFill = "#fff",
  nodeStroke = "#000",
  nodeStrokeOpacity = 1,
  nodeStrokeWidth = 1.5,
  nodeRadius = 3.5,
  colors = d3.schemeTableau10;

export async function forceGraph(params) {
  const fakeDom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
  const body = d3.select(fakeDom.window.document).select("body");

  const data = await getData(
    "http://localhost:3000/static/datakegiatanorganisasimhs_2016-2020.csv"
  );

  const { nodes, links } = getNodesAndLinks(data);

  const forceNode = d3.forceManyBody().strength(-10);
  const forceLink = d3
    .forceLink(links)
    .id(({ index: i }) => i)
    .strength(1);

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", forceLink)
    .force("charge", forceNode)
    .force("center", d3.forceCenter());

  const svg = body
    .append("svg")
    .attr("viewBox", [-1920 / 2, -1080 / 2, 1920, 1080])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const link = svg
    .append("g")
    .attr("stroke", linkStrokeColor)
    .attr("stroke-opacity", linkStrokeOpacity)
    .attr("stroke-width", linkStrokeWidth)
    .attr("stroke-linecap", linkStrokeLinecap)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = svg
    .append("g")
    .attr("fill", nodeFill)
    .attr("stroke", nodeStroke)
    .attr("stroke-opacity", nodeStrokeOpacity)
    .attr("stroke-width", nodeStrokeWidth)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", nodeRadius);

  node.append("title").text((d) => d.name);
  node.attr("fill", (d) => colors[d.group * 2]);

  node.call(() => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  return await body.html();
}
