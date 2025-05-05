import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { BrokerInterface } from 'src/broker/domain/services/broker.service';
import { FileDownloaderInterface } from 'src/file-downloader/domain/services/file-downloader.service';
import { QUEUE_NAME } from 'src/statement-parser/constants';
import { FileParserInterface } from 'src/statement-parser/domain/services/parser.service';

@Injectable()
export class ParserService implements OnModuleInit {

  private readonly logger = new Logger(ParserService.name);
  private readonly queue = QUEUE_NAME;

  constructor(
    @Inject('BrokerInterface')
    private broker: BrokerInterface,

    @Inject('FileDownloaderInterface')
    private fileReader: FileDownloaderInterface,

    @Inject('FileParserInterface')
    private fileParser: FileParserInterface<Record<string, any>>,
  ) { }

  async onModuleInit() {
    await this.broker.connect();

    this.logger.log(`Listening on queue ${this.queue}`);

    await this.broker.consume(this.queue, async (content) => {
      const { filePath, headers, metadata } = JSON.parse(content.toString());

      this.logger.log(`Processing file: ${filePath}`);
      const buffer = await this.fileReader.read(filePath, headers);

      const records = await this.fileParser.parse(buffer);
      this.logger.log(`Parsed ${records.length} records`, JSON.stringify(metadata));

      // TODO: Implement business logic to process records
      // ...

      this.logger.log(`Finished processing file: ${filePath}`);
    });
  }

}
