import { StatementRecord } from "src/statement-parser/domain/entity/statement-record";

export interface PersistEntriesService {

  persistEntries(entries: Array<StatementRecord>): Promise<void>;

}
