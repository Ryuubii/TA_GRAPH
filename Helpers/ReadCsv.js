import fs from "fs";
import { parse } from "csv";

export async function readCsv(csvfile) {
    let records = [];
    const parser = fs
    .createReadStream(`./public/${csvfile}`)
    .pipe(parse({
        columns: true
    }));
    for await (const record of parser) {
      records.push(record);
    }
    return records;
  }