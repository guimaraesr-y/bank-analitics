import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { TransactionRepository } from "src/transactions/domain/repositories/transaction.repository";
import { TransactionService } from "src/transactions/domain/services/transaction.service";
import { CreateTransactionInterface, UpdateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";
import { UsersService } from "src/users/domain/services/users.service";

// TODO: Deal with errors properly

@Injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,

    private readonly userService: UsersService,
  ) { }

  async createTransaction(transactionData: CreateTransactionInterface) {
    return await this.transactionRepository.createTransaction(transactionData);
  }

  async getTransactionsByUserId(userId: string) {
    return this.transactionRepository.getTransactionsByUserId(userId);
  }

  async getTransactionById(id: number) {
    return this.transactionRepository.getTransactionById(id);
  }

  async updateTransaction(updateData: UpdateTransactionInterface) {
    const entity = await this.transactionRepository.getTransactionById(updateData.id);

    if (!entity) {
      throw new NotFoundException(`Transaction #${updateData.id} not found`);
    }

    return this.transactionRepository.updateTransaction(updateData);
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.transactionRepository.softDelete(id);
  }

}
