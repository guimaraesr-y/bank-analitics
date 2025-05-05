import { Module } from '@nestjs/common';
import { StatementParserModule } from './statement-parser/statement-parser.module';
import { BrokerModule } from './broker/broker.module';
import { FileDownloaderModule } from './file-downloader/file-downloader.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BrokerModule,
    FileDownloaderModule,
    StatementParserModule,
  ],
})
export class AppModule {}
