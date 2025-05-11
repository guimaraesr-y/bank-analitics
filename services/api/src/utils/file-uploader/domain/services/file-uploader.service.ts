import { UploadedFile } from "../entities/uploaded-file";

export interface FileUploader {

  upload(file: Express.Multer.File): Promise<UploadedFile>;

}
