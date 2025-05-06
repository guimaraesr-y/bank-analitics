import { CreateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";
import { Transaction } from "../entities/transaction";

export interface BulkTransactionRepository {

  bulkCreateTransaction(transactionData: CreateTransactionInterface[]): Promise<void>;

}
