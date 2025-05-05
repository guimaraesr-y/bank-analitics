import { Module } from '@nestjs/common';
import { HttpFileReader } from './infra/adapters/http-file-reader.adapter';

@Module({
  providers: [
    {
      provide: 'FileDownloaderInterface',
      useValue: HttpFileReader
    }
  ],
  exports: [
    'FileDownloaderInterface',
  ],
})
export class FileDownloaderModule {}
