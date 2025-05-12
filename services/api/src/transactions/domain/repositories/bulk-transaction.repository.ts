import { CreateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";

export interface BulkTransactionRepository {

  bulkCreateTransaction(transactionData: CreateTransactionInterface[]): Promise<void>;

}
