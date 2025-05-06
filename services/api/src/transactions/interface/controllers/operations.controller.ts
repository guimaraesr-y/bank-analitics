import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateTransactionInterface } from '../serializers/create-transaction.interface';
import { BulkTransactionService } from 'src/transactions/domain/services/bulk-transaction.service';
import { OperationsGuard } from 'src/auth/operations.guard';

@UseGuards(OperationsGuard)
@Controller('transactions')
export class TransactionOperationsController {

  constructor(
    @Inject('BulkTransactionService')
    private readonly transactionService: BulkTransactionService
  ) {}

  @Post('operations')
  async bulkCreateTransactions(@Body() transactionData: CreateTransactionInterface[]) {
    await this.transactionService.bulkCreateTransaction(transactionData);

    return {
      success: true
    }
  }

}
