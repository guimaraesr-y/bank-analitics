
export interface FileParserInterface<T> {

  /**
   * Parses raw file Buffer into domain records
   * @param fileBuffer raw file data
   * @returns array of parsed records
   */
  parse(fileBuffer: Buffer): Promise<T[]>;

}
