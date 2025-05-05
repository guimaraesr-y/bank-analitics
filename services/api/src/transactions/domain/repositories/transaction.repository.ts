import { CreateTransactionInterface, UpdateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";
import { Transaction } from "../entities/transaction";

export interface TransactionRepository {
  
  createTransaction(transactionData: CreateTransactionInterface): Promise<Transaction>;
  getTransactionsByUserId(userId: string): Promise<Transaction[]>;
  getTransactionById(id: number): Promise<Transaction | null>;
  updateTransaction(updateData: UpdateTransactionInterface): Promise<Transaction>;
  deleteTransaction(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;

}
