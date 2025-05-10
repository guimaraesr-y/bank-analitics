import { Injectable } from '@nestjs/common';
import { BankEnum } from 'src/utils/constants';
import { BankService } from '../services/banks/bank.service';
import { NubankService } from '../services/banks/nubank-service';
import { FileParserFactory } from './file-parser.factory';

@Injectable()
export class BankServiceFactory {

  constructor(
    private fileParserFactory: FileParserFactory
  ) { }

  create(bank: BankEnum): BankService {
    switch (bank) {
      case BankEnum.NUBANK:
        return new NubankService(this.fileParserFactory);
      default:
        throw new Error(`Unsupported bank: ${bank}`);
    }
  }

}
