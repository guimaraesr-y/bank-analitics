import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.repository';
import { CreateTransactionInterface, UpdateTransactionInterface } from 'src/transactions/interface/serializers/create-transaction.interface';
import { TransactionEntity } from '../entities/transaction.entity';
import { Transaction } from 'src/transactions/domain/entities/transaction';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<Transaction>,
  ) { }

  async createTransaction(transactionData: CreateTransactionInterface): Promise<Transaction> {
    const entity = this.repository.create(transactionData);
    return await this.repository.save(entity);
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return await this.repository.find({ where: { user: { id: userId } } });
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return await this.repository.findOneBy({ id });
  }

  async updateTransaction(updateData: UpdateTransactionInterface): Promise<Transaction> {
    const entity = await this.repository.preload(updateData);

    if (!entity) {
      throw new Error(`Transaction #${updateData.id} not found`);
    }

    return await this.repository.save(entity);
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

}
