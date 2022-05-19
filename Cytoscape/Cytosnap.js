import cytosnap from "cytosnap";
import { readCsv } from "../Helpers/ReadCsv.js";
import { getEles } from "../Helpers/GetEles.js";
import fs from 'fs';

export async function cytoSnapGraph(params) {
    //Initialize Cytosnap
    let snap = cytosnap();
    //Read CSV file as JSON data
    const data = await readCsv("datakegiatanorganisasimhs_2016-2020.csv");
    //Convert JSON data into array
    let imgUri = "";
    //Start the cytoscape snapshot
    snap.start().then(function(){
        //Configure data and layout of snapshop
        return snap.shot({
          elements: eles,
          layout: {
            name: 'grid'
          },
          style: [
            {
              selector: 'node',
              style: {
                'background-color': 'red'
              }
            },
            {
              selector: 'edge',
              style: {
                'line-color': 'black'
              }
            }
          ],
          resolvesTo: 'base64uri',
          format: 'png',
          width: 1920,
          height: 1080,
          background: '#FFF'
        });
      }).then(function( img ){
        // do whatever you want with img
        imgUri = img;
        let base64Image = img.split(';base64,').pop();
        //Save cytosnap result as image file
        fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
          console.log('File created');
        });
      });

      //Cytosnap return on timeout
      setTimeout(() => {
        console.log("Image: \n" + imgUri.substring(0,20));
        return imgUri;
      }, 5 * 1000);
    
}