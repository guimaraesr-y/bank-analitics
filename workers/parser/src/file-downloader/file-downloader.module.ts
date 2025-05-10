import { Module } from '@nestjs/common';
import { HttpFileReader } from './infra/adapters/http-file-reader.adapter';

@Module({
  providers: [
    {
      provide: 'FileDownloaderInterface',
      useClass: HttpFileReader,
    }
  ],
  exports: [
    'FileDownloaderInterface',
  ],
})
export class FileDownloaderModule {}
