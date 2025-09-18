import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { parse } from "csv-parse/sync";
import * as fs from "fs";

@Injectable()
export class CsvParserUtil {
  private readonly logger = new Logger(CsvParserUtil.name);

  async parseCSVFile(filePath: string): Promise<any[]> {
    this.logger.log(`Parsing CSV file: ${filePath}`);

    try {
      const inputFile = fs.readFileSync(filePath, { encoding: "utf-8" });

      const records = parse(inputFile, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ";",
        trim: true,
      });

      const processed = records.map((row: any) => {
        const lowered: any = {};
        for (const key in row) {
          lowered[key.toLowerCase()] =
            typeof row[key] === "string"
              ? row[key].toLowerCase().trim()
              : row[key];
        }
        return lowered;
      });

      return processed;
    } catch (error) {
      this.logger.error(`Failed to parse CSV file: ${filePath}`, error);
      throw new BadRequestException(
        `Failed to parse CSV file: ${error.message}`
      );
    }
  }
}
