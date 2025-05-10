import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { FileParserInterface } from 'src/statement-parser/domain/services/parser.service';

export class CsvFileParser implements FileParserInterface {

  async parse(fileBuffer: Buffer): Promise<Array<Record<string, any>>> {
    const content = fileBuffer.toString('utf-8');
    return parse(content, { columns: true });
  }

}
