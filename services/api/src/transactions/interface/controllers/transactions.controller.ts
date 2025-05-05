import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionService } from 'src/transactions/domain/services/transaction.service';
import { User } from 'src/users/domain/entities/user';
import { CreateTransactionInterface } from '../serializers/create-transaction.interface';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {

  constructor(
    @Inject('TransactionService')
    private readonly transactionService: TransactionService
  ) {}

  @Get()
  async getTransactions(@Req() req) {
    const user = req.user as User;
    return this.transactionService.getTransactionsByUserId(user.id);
  }

  @Post()
  async createTransaction(@Req() req, @Body() transactionData: CreateTransactionInterface) {
    const user = req.user as User;
    return this.transactionService.createTransaction({
      ...transactionData,
      user: { id: user.id },
    });
  }

}
