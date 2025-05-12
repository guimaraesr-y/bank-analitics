import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { BrokerInterface } from 'src/broker/domain/services/broker.service';
import { FileDownloaderInterface } from 'src/file-downloader/domain/services/file-downloader.service';
import { PersistEntriesService } from 'src/record-persistence/domain/services/persist-entries.service';
import { QUEUE_NAME } from 'src/statement-parser/constants';
import { StatementBrokerMessage } from 'src/statement-parser/domain/entity/statement-broker-message';
import { BankServiceFactory } from 'src/statement-parser/domain/factories/bank-service.factory';

@Injectable()
export class ParserService implements OnModuleInit {

  private readonly logger = new Logger(ParserService.name);
  private readonly queue = QUEUE_NAME;

  constructor(
    @Inject('BrokerInterface')
    private broker: BrokerInterface,

    @Inject('FileDownloaderInterface')
    private fileDownloader: FileDownloaderInterface,

    @Inject('PersistEntriesService')
    private persistEntriesService: PersistEntriesService,

    private bankServiceFactory: BankServiceFactory,
  ) { }

  async onModuleInit() {
    await this.broker.connect();

    this.logger.log(`Listening on queue ${this.queue}`);
    await this.broker.consume(this.queue, this.handleMessage.bind(this));
  }

  private async handleMessage(content: Buffer) {
    const message = JSON.parse(content.toString()) as StatementBrokerMessage;
    const { userId, bank, fileUrl, fileType } = message;

    this.logger.log(`Processing file at: ${fileUrl}`);
    const file = await this.fileDownloader.read(fileUrl);

    const bankService = this.bankServiceFactory.create(bank);
    const records = await bankService.parse(file, fileType, userId);

    this.logger.log(`Parsed ${records.length} records`, JSON.stringify({
      userId, bank, fileUrl, fileType
    }));

    await this.persistEntriesService.persistEntries(records);

    this.logger.log(`Finished processing file: ${fileUrl}`);
  }

}
