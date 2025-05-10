import { BankEnum, StatementType } from "src/utils/constants";

export interface StatementBrokerMessage {
  userId: string;
  bank: BankEnum;
  fileUrl: string;
  fileType: StatementType
}
