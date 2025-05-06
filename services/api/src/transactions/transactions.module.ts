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

@Module({
  imports: [
    AuthModule,
    CryptoModule,
    UsersModule,
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [
    TransactionsController,
    TransactionOperationsController,
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
  ],
})
export class TransactionsModule {}
