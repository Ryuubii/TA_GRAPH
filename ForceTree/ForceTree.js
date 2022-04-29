
import * as d3 from "d3";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

export async function forceTree(params) {
    try {
        const data = await d3.csv("http://localhost:3000/static/datakegiatanorganisasimhs_2016-2020.csv");
        const root = d3.hierarchy(data);
        const links = root.links();
        const nodes = root.descendants(); 
    
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("x", d3.forceX())
            .force("y", d3.forceY());
    
        const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        const body = d3.select(fakeDom.window.document).select('body'); 
        const svg = body.append("svg")
            .attr("viewBox", [-1920 / 2, -1080 / 2, 1920, 1080]);
    
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line");
    
        const node = svg.append("g")
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
            .attr("fill", d => d.children ? null : "#000")
            .attr("stroke", d => d.children ? null : "#fff")
            .attr("r", 3.5);
    
        node.append("title")
            .text(d => d.data.name);
    
        simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        });
    
        return svg.node();
    } catch(e) {
        console.log("Error: " + e);
        return {};
    }
    
}