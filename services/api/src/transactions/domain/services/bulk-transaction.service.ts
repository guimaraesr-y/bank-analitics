import { CreateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";

export interface BulkTransactionService {

  bulkCreateTransaction(transactionData: CreateTransactionInterface[]): Promise<boolean>;

}
