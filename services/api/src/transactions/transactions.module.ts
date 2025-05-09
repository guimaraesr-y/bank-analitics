import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { TransactionEntity } from './infra/entities/transaction.entity';

import { TransactionsController } from './interface/controllers/transactions.controller';
import { TransactionServiceImpl } from './infra/services/transaction.service';
import { TransactionRepositoryImpl } from './infra/repositories/transaction.repository';
import { BulkTransactionServiceImpl } from './infra/services/bulk-transaction.service';
import { BulkTransactionRepositoryImpl } from './infra/repositories/bulk-transaction.repository';
import { TransactionOperationsController } from './interface/controllers/operations.controller';
import { BrokerModule } from 'src/broker/broker.module';
import { FileUploaderModule } from 'src/utils/file-uploader/file-uploader.module';
import { ImportTransactionsController } from './interface/controllers/import-transactions.controller';
import { ImportTransactionsServiceImpl } from './infra/services/import-transactions.service';

@Module({
  imports: [
    BrokerModule,
    AuthModule,
    CryptoModule,
    UsersModule,
    FileUploaderModule,
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [
    TransactionsController,
    TransactionOperationsController,
    ImportTransactionsController,
  ],
  providers: [
    {
      provide: 'TransactionRepository',
      useClass: TransactionRepositoryImpl,
    },
    {
      provide: 'TransactionService',
      useClass: TransactionServiceImpl,
    },
    {
      provide: 'BulkTransactionService',
      useClass: BulkTransactionServiceImpl,
    },
    {
      provide: 'BulkTransactionRepository',
      useClass: BulkTransactionRepositoryImpl,
    },
    {
      provide: 'ImportTransactionsService',
      useClass: ImportTransactionsServiceImpl,
    }
  ],
})
export class TransactionsModule {}
