import cytoscape from "cytoscape";
import { getEles } from "../Helpers/GetEles.js";
import { stringify } from 'flatted';

export async function cytoGraphWeightJSON(params) {
    let eles = [];
    try {
        const response = await fetch("http://localhost:3000/static/data.json");
        const data = await response.json();

        eles = getEles(data);
        
    } catch (error) {
        console.log("Invalid JSON");
        return {
            "code" : 403,
            "message" : "Invalid json. JSON format is {}"
        }
    }

    let cy = cytoscape({
        // container: document.getElementById("cy"),
        fit: true,
        padding: 30,
        centerGraph: true,
    });

    cy.add(eles);

    const markov = cy.elements().markovClustering();
    const jsonified = stringify(markov)
    const l = cy.layout({
        name: "random"
    }).run();

    // console.log(body);
    return jsonified;
}
