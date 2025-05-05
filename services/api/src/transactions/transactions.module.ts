import { Module } from '@nestjs/common';
import { TransactionsController } from './interface/controllers/transactions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TransactionRepositoryImpl } from './infra/repositories/transaction.repository';
import { CryptoModule } from 'src/crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './infra/entities/transaction.entity';
import { TransactionServiceImpl } from './infra/services/transaction.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthModule,
    CryptoModule,
    UsersModule,
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [TransactionsController],
  providers: [
    {
      provide: 'TransactionRepository',
      useClass: TransactionRepositoryImpl,
    },
    {
      provide: 'TransactionService',
      useClass: TransactionServiceImpl,
    }
  ],
})
export class TransactionsModule {}
