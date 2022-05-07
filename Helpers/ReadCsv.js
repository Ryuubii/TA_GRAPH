import fs from "fs";
import { parse } from "csv";

export async function readCsv(csvfile) {
  let records = [];
  const parser = fs.createReadStream(`./public/${csvfile}`).pipe(
    parse({
      columns: true,
      delimiter: ",",
      encoding: "utf-8",
      ignore_last_delimiters: true,
      trim: true,
      skip_empty_lines: true,
      skip_records_with_empty_values: true,
    })
  );
  for await (const record of parser) {
    records.push(record);
  }
  return records;
}
