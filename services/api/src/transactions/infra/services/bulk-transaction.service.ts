import { Injectable, Inject } from "@nestjs/common";
import { BulkTransactionRepository } from "src/transactions/domain/repositories/bulk-transaction.repository";
import { BulkTransactionService } from "src/transactions/domain/services/bulk-transaction.service";
import { InvalidData } from "src/transactions/interface/exceptions/invalid-data.exception";
import { CreateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";
import { QueryFailedError } from "typeorm/error/QueryFailedError";

@Injectable()
export class BulkTransactionServiceImpl implements BulkTransactionService {

  constructor(
    @Inject('BulkTransactionRepository')
    private readonly transactionRepository: BulkTransactionRepository,
  ) { }

  async bulkCreateTransaction(transactionData: CreateTransactionInterface[]) {
    try {
      await this.transactionRepository.bulkCreateTransaction(transactionData);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InvalidData();
      }

      throw error;
    }
    return true;
  }

}
