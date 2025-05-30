import { Module } from '@nestjs/common';
import { BrokerModule } from 'src/broker/broker.module';
import { FileDownloaderModule } from 'src/file-downloader/file-downloader.module';
import { ParserService } from './infra/service/parser.service';
import { BankServiceFactory } from './domain/factories/bank-service.factory';
import { FileParserFactory } from './domain/factories/file-parser.factory';
import { RecordPersistenceModule } from 'src/record-persistence/record-persistence.module';

@Module({
  imports: [
    BrokerModule,
    FileDownloaderModule,
    RecordPersistenceModule,
  ],
  providers: [
    ParserService,
    BankServiceFactory,
    FileParserFactory,
  ],
  exports: [
    ParserService,
  ],
})
export class StatementParserModule { }
