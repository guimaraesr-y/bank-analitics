import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionInterface } from 'src/transactions/interface/serializers/create-transaction.interface';
import { TransactionEntity } from '../entities/transaction.entity';
import { Transaction } from 'src/transactions/domain/entities/transaction';
import { BulkTransactionRepository } from 'src/transactions/domain/repositories/bulk-transaction.repository';

@Injectable()
export class BulkTransactionRepositoryImpl implements BulkTransactionRepository {

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<Transaction>,
  ) { }

  async bulkCreateTransaction(transactionData: CreateTransactionInterface[]): Promise<void> {
    // TODO: implement pagination
    const result = await this.repository.createQueryBuilder()
      .insert()
      .into(TransactionEntity)
      .values(transactionData)
      .execute();
  }

}
