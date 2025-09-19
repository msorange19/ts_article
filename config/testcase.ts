import fs from "fs";
import Papa from "papaparse";

export function readCsv(filePath: string) {
    const file = fs.readFileSync(filePath, "utf8");
    const parsed = Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
    });
    return parsed.data;
}

export function updateCsv(filePath: string,testID:string,scenario:string,testName: string, status: string) {
    const records: any[] = readCsv(filePath);

    const updated = records.map((row) =>
        row["Test_ID"] === testID ||row["Test_Name"]===testName ||row["Scenario"]===scenario? { ...row, Status: status } : row
    );

    const csv = Papa.unparse(updated);
    fs.writeFileSync(filePath, csv, "utf8");
}
