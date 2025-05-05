import { Module } from '@nestjs/common';
import { BrokerModule } from 'src/broker/broker.module';
import { FileDownloaderModule } from 'src/file-downloader/file-downloader.module';
import { CsvFileParser } from './infra/adapters/csv-file-parser.adapter';
import { ParserService } from './infra/service/parser.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BrokerModule,
    FileDownloaderModule,
  ],
  providers: [
    ParserService,
    {
      provide: 'FileParserInterface',
      useClass: CsvFileParser,
    }
  ],
  exports: [
    ParserService,
    'FileParserInterface',
  ],
})
export class StatementParserModule { }
