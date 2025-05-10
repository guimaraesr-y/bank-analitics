import { User } from "src/users/domain/entities/user";
import { BankEnum } from "src/utils/constants/banks";

export interface TransactionBrokerMessage {
  userId: User['id'];
  bank: BankEnum;
  fileUrl: string;
}
