import * as fs from "fs";
import { parse } from "csv-parse/sync";

export class DataProvider {
  static getTestDataFromJson(filePath: string): any {
    let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data;
  }

  static getTestDataFromCsv(filePath: string): any {
    let data = parse(fs.readFileSync(filePath, "utf-8"), { columns: true });
    return data;
  }
}
