import { CreateTransactionInterface } from "src/transactions/interface/serializers/create-transaction.interface";
import { Transaction } from "../entities/transaction";

export interface BulkTransactionService {

  bulkCreateTransaction(transactionData: CreateTransactionInterface[]): Promise<boolean>;

}
