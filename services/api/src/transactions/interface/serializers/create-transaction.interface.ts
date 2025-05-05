import { Transaction } from "src/transactions/domain/entities/transaction";
import { User } from "src/users/domain/entities/user";

export interface CreateTransactionInterface {
  readonly amount: number;
  readonly user: Partial<Pick<User, 'id'>>;
  readonly to: string;
}

export interface UpdateTransactionInterface extends Partial<Transaction> {
  id: number;
}
