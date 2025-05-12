import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { FileUploader } from '../../domain/services/file-uploader.service';
import { ConfigService } from '@nestjs/config';
import { UploadedFile } from '../../domain/entities/uploaded-file';

@Injectable()
export class LocalFileUploader implements FileUploader {

  private baseUrl: string;
  private fileUploadDir: string;

  constructor(
    private configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get('BASE_URL') || 'http://localhost:3000';
    this.fileUploadDir = this.configService.get('PRIVATE_FILE_UPLOAD_DIR') || './private-uploads';
  }

  /**
   * Uploads a file to the local file system.
   * 
   * @param file - The file to be uploaded, represented as an Express.Multer.File object.
   * @returns A promise that resolves to the file path where the uploaded file is stored.
   */
  async upload(file: Express.Multer.File): Promise<UploadedFile> {
    const extension = extname(file.originalname);
    const newName = uuidv4() + extension;

    await mkdir(this.fileUploadDir, { recursive: true });

    const filePath = join(this.fileUploadDir, newName);
    await writeFile(filePath, file.buffer);

    const relativeUrlPath = filePath
      .replace(/^[.\\/]+/, '')
      .replace(/\\/g, '/');

    const fileUrl = this.baseUrl + '/' + relativeUrlPath;

    return {
      fileUrl,
      extension: extension.replace('.', ''),
    };
  }

}
