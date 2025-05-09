import { User } from "src/users/domain/entities/user";

export interface ImportTransactionsService {

  importTransactions(userId: User['id'], bank: string, fileBuffer: Express.Multer.File): Promise<void>;

}
