import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { LocalFileUploader } from './local-file-uploader.adapter';
import * as fs from 'fs';
import * as path from 'path';

describe('LocalFileUploader', () => {
  let service: LocalFileUploader;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalFileUploader,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'PRIVATE_FILE_UPLOAD_DIR') {
                return './private-uploads-test';
              }
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<LocalFileUploader>(LocalFileUploader);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    const dir = configService.get('PRIVATE_FILE_UPLOAD_DIR');
    if (fs.existsSync(dir)) {
      await fs.promises.rm(dir, { recursive: true });
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload file', async () => {
    const file = {
      originalname: 'test.txt',
      buffer: Buffer.from('test'),
    } as Express.Multer.File;

    const uploadedFile = await service.upload(file);

    expect(fs.existsSync(uploadedFile)).toBe(true);
    expect(uploadedFile).toContain(
      configService.get('PRIVATE_FILE_UPLOAD_DIR').replace('./', '')
    );
    expect(uploadedFile).toContain('.txt');
  });
});
