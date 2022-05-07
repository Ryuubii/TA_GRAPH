import * as d3 from "d3";

export async function getData(csvUrl) {
  return await d3.csv(csvUrl);
}
