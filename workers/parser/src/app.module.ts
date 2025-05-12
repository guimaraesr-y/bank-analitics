import { Module } from '@nestjs/common';
import { StatementParserModule } from './statement-parser/statement-parser.module';
import { BrokerModule } from './broker/broker.module';
import { FileDownloaderModule } from './file-downloader/file-downloader.module';
import { ConfigModule } from '@nestjs/config';
import { RecordPersistenceModule } from './record-persistence/record-persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BrokerModule,
    FileDownloaderModule,
    StatementParserModule,
    RecordPersistenceModule,
  ],
})
export class AppModule {}
