import { Injectable } from '@nestjs/common';
import { FileParserInterface } from 'src/statement-parser/domain/services/parser.service';
import { CsvFileParser } from '../../infra/adapters/parsers/csv-file-parser.adapter';
import { StatementType } from 'src/utils/constants';

@Injectable()
export class FileParserFactory {

  create(fileType: StatementType): FileParserInterface {
    switch (fileType) {
      case StatementType.CSV:
        return new CsvFileParser();
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }

}
