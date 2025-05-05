import { Transaction } from "../entities/transaction";
import { CreateTransactionInterface, UpdateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";

export interface TransactionService {

  createTransaction(transactionData: CreateTransactionInterface): Promise<Transaction>;
  getTransactionsByUserId(id: string): Promise<Transaction[]>;
  getTransactionById(id: number): Promise<Transaction | null>;
  updateTransaction(updateData: UpdateTransactionInterface): Promise<Transaction>;
  deleteTransaction(id: number): Promise<void>;

}
