import { Inject, Injectable } from '@nestjs/common';
import { SenderBrokerService } from 'src/broker/domain/services/sender-broker.service';
import { TransactionBrokerMessage } from 'src/transactions/domain/entities/transaction-broker-message';
import { ImportTransactionsService } from 'src/transactions/domain/services/import-transactions.service';
import { User } from 'src/users/domain/entities/user';
import { BankEnum } from 'src/utils/constants/banks';
import { FileUploader } from 'src/utils/file-uploader/domain/services/file-uploader.service';

@Injectable()
export class ImportTransactionsServiceImpl implements ImportTransactionsService {
  constructor(
    @Inject('SenderBrokerService')
    private readonly senderBroker: SenderBrokerService,
    
    @Inject('FileUploader')
    private readonly fileUploader: FileUploader,
  ) {}

  async importTransactions(
    userId: User['id'],
    bank: BankEnum,
    file: Express.Multer.File,
  ): Promise<void> {
    const fileUrl = await this.fileUploader.upload(file);

    const message = this.getBrokerMessageBuffer({ userId, bank, fileUrl });
    await this.senderBroker.send('statements', message);
  }

  /**
   * Converts a TransactionBrokerMessage object into a Buffer.
   * This buffer is intended to be sent over the message broker.
   *
   * @param message - The TransactionBrokerMessage object containing userId, bank, and fileUrl.
   * @returns A Buffer containing the serialized message.
   */
  private getBrokerMessageBuffer(message: TransactionBrokerMessage): Buffer {
    return Buffer.from(JSON.stringify(message));
  }

}
