import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FileDownloaderInterface } from 'src/file-downloader/domain/services/file-downloader.service';

@Injectable()
export class HttpFileReader implements FileDownloaderInterface {

  async read(pathOrUrl: string, headers: Record<string, string> = {}): Promise<Buffer> {
    // TODO: implement efficient way to download big files

    const response = await axios.get<Buffer>(pathOrUrl, {
      responseType: 'arraybuffer',
      headers,
    });
    return Buffer.from(response.data);
  }

}
