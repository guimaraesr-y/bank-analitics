import { Controller, Inject, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/domain/entities/user';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportTransactionsService } from 'src/transactions/domain/services/import-transactions.service';

@UseGuards(AuthGuard)
@Controller('transactions/import')
export class ImportTransactionsController {

  constructor(
    @Inject('ImportTransactionsService')
    private readonly transactionService: ImportTransactionsService
  ) { }

  @Post('/:bank')
  @UseInterceptors(FileInterceptor('file'))
  async importTransactions(
    @Req() req,
    @Param() params,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user as User;
    await this.transactionService.importTransactions(user.id, params.bank, file);

    return {
      success: true,
    }
  }

}
