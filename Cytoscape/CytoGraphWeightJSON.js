import cytoscape from "cytoscape";
import { getEles } from "../Helpers/GetEles.js";
import { stringify } from 'flatted';

export async function cytoGraphWeightJSON(params) {

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
    const jsonified = stringify(markov)
    const l = cy.layout({
        name: "random"
    }).run();

    // console.log(body);
    return jsonified;
}
