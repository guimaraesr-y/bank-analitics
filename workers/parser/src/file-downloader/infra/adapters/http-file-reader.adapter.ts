import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { FileDownloaderInterface } from 'src/file-downloader/domain/services/file-downloader.service';

@Injectable()
export class HttpFileReader implements FileDownloaderInterface {

  constructor(
    private configService: ConfigService,
  ) { }

  async read(pathOrUrl: string, headers: Record<string, string> = {}): Promise<Buffer> {
    // TODO: implement efficient way to download big files
    if (!headers['Authorization']) {
      headers['Authorization'] = this.getAuthorizationHeader() || '';
    }

    const response = await axios.get<Buffer>(pathOrUrl, {
      responseType: 'arraybuffer',
      headers,
    });
    return Buffer.from(response.data);
  }

  private getAuthorizationHeader(): string | undefined {
    const token = this.configService.get<string>('WORKER_TOKEN');
    return token ? `Bearer ${token}` : undefined;
  }

}
