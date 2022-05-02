
import * as d3 from "d3";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

export async function forceTree(params) {
    const fakeDom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
    const body = d3.select(fakeDom.window.document).select("body");

    try {
        const data = await d3.csv("http://localhost:3000/static/datakegiatanorganisasimhs_2016-2020.csv");

        let nodes = [];
        let links = [];
        data.forEach(d => {
            if(nodes.indexOf(d.mhs_nrp.trim()) < 0) {
              nodes.push(d.mhs_nrp.trim());
            }
            if(nodes.indexOf(d.keg_kode.trim()) < 0) {
              nodes.push(d.keg_kode.trim());
            }
            links.push({source: nodes.indexOf(d.mhs_nrp.trim()), target: nodes.indexOf(d.keg_kode.trim())});
        });
        nodes = nodes.map(n => {return {name: n}});

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.index).distance(0).strength(1))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("x", d3.forceX())
            .force("y", d3.forceY());
    
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
        .attr("fill", "#000")
        .attr("stroke", "#fff")
        .attr("r", 3.5);
    
        node.append("title")
            .text(d => d.name);
    
        node.call(() => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        return body.html();
    } catch(e) {
        console.error("Error: " + e);
        return {};
    }
}