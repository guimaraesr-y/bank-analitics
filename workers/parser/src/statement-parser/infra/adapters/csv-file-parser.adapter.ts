import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { FileParserInterface } from 'src/statement-parser/domain/services/parser.service';

@Injectable()
export class CsvFileParser<T extends Record<string, any>> implements FileParserInterface<T> {

  async parse(fileBuffer: Buffer): Promise<T[]> {
    const content = fileBuffer.toString('utf-8');
    return parse(content, { columns: true }) as T[];
  }

}
