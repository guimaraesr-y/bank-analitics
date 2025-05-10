import { StatementRecord } from "../entity/statement-record";

export interface FileParserInterface {

  /**
   * Parses raw file Buffer into domain records
   * @param fileBuffer raw file data
   * @returns array of parsed records
   */
  parse(fileBuffer: Buffer): Promise<Array<Record<string, any>>>;

}
