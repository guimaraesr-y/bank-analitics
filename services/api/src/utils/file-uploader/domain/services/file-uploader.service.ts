export interface FileUploader {

  upload(file: Express.Multer.File): Promise<string>;

}
