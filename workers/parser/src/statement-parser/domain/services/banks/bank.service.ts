import { StatementType } from "src/utils/constants";
import { StatementRecord } from "../../entity/statement-record";

export interface BankService {

  parse(file: Buffer, fileType: StatementType, userId: string): Promise<Array<StatementRecord>>;

}
