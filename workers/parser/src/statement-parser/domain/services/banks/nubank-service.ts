import { StatementType } from "src/utils/constants";
import { BankService } from "./bank.service";
import { StatementRecord } from "../../entity/statement-record";
import { FileParserFactory } from "../../factories/file-parser.factory";

export class NubankService implements BankService {

  constructor(
    private fileParserFactory: FileParserFactory
  ) { }

  /**
   * Parses a file buffer into an array of statement records.
   * 
   * @param file - The file buffer containing the raw statement data.
   * @param fileType - The type of the statement file (e.g., CSV, OFX).
   * @returns A promise that resolves to an array of parsed statement records.
   */
  async parse(file: Buffer, fileType: StatementType, userId: string): Promise<Array<StatementRecord>> {
    const parser = this.fileParserFactory.create(fileType);
    const entries = await parser.parse(file);

    return this.format(fileType, entries, userId);
  }

  private format(fileType: StatementType, entries: Record<string, any>, userId: string): Array<StatementRecord> {
    switch (fileType) {
      case StatementType.CSV:
        return entries.map((entry: Record<string, any>) => ({
          date: entry.date,
          description: '',
          amount: entry.amount,
          to: entry.title,
          user: { id: userId },
        }));
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }

}
