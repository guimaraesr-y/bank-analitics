import { Module } from '@nestjs/common';
import { LocalFileUploader } from './infra/adapters/local-file-uploader.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FileUploader',
      useClass: LocalFileUploader,
    }
  ],
  exports: [
    'FileUploader',
  ],
})
export class FileUploaderModule {}
