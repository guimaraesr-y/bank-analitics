export interface FileDownloaderInterface {
  /**
   * Reads the file at the given path or URL.
   * @param pathOrUrl local path or external URL
   * @param headers optional headers for HTTP requests
   * @returns file contents as Buffer
   */
  read(pathOrUrl: string, headers?: Record<string, string>): Promise<Buffer>;
}