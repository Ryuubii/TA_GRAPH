import cytoscape from "cytoscape";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";
import { stringify } from 'flatted';

const body = window.document.getElementsByTagName("body")[0];
body.insertAdjacentHTML("afterbegin", `<div id="cy" style="width: 100%; height: 100%; display: block;"></div>`);
Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientWidth', {value: 1920});
Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', {value: 1080});
Object.defineProperty(document.getElementById('cy'), 'offsetWidth', {value: 1920});
Object.defineProperty(document.getElementById('cy'), 'offsetHeight', {value: 1080});

export async function cytoGraphWeightJSON(params) {
    console.log(document.getElementById('cy').offsetWidth);
    console.log(document.getElementById('cy').offsetHeight);

    let cy = cytoscape({
        // container: document.getElementById("cy"),
        fit: true,
        padding: 30,
        centerGraph: true,
    });
    fetch("http://localhost:3000/static/data.json").then(function(response){
        return response.json();
    }).then(function(data){
        const eles = getEles(data);
        cy.add(eles);
    })

    const markov = cy.elements().markovClustering();
    // console.log(markov);
    const jsonified = stringify(markov)
    const l = await cy.layout({
        name: "random"
    }).run();

    // console.log(body);
    return jsonified;
}
