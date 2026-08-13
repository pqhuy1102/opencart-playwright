import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { LoginData } from "../interface/LoginData";

export class DataProvider {
  static getTestDataFromJson(filePath: string): LoginData[] {
    let data: LoginData[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data;
  }

  static getTestDataFromCsv(filePath: string): LoginData[] {
    let data: LoginData[] = parse(fs.readFileSync(filePath, "utf-8"), {
      columns: true,
    });
    return data;
  }
}
