import { Controller, Get, Headers, NotFoundException, Param, StreamableFile, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, Stats, statSync } from 'fs';
import { join, resolve } from 'path';
import { OperationsGuard } from 'src/auth/operations.guard';

@Controller('private-uploads')
@UseGuards(OperationsGuard)
export class PrivateController {
  // TODO: Implement files into database and user-based authorization

  private uploadDir: string;

  constructor(private readonly config: ConfigService) {
    this.uploadDir = resolve(process.cwd(), this.config.get('PRIVATE_FILE_UPLOAD_DIR')!);
  }

  @Get('/:fileName')
  async getPrivateUploads(
    @Param('fileName') fileName: string,
    @Headers('Authorization') authToken: string,
  ) {

    const filePath = join(this.uploadDir, fileName);
    let data: Buffer;

    let stats: Stats;
    try {
      stats = statSync(filePath);
      if (!stats.isFile()) throw new Error();
    } catch {
      throw new NotFoundException(`Arquivo ${filePath} não encontrado`);
    }

    const fileStream = createReadStream(filePath);
    return new StreamableFile(fileStream);
  }

}
