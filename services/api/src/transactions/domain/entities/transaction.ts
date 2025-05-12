import { User } from "src/users/domain/entities/user";
import { Money } from "./money";

export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  description?: string;
  user: User;
  to: string;
}

export class TransactionEntity implements Transaction {

  id: number;
  amount: number;
  date: Date;
  description?: string;
  user: User;
  to: string;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
    this.amount = new Money(partial.amount!).amount;
  }

}
