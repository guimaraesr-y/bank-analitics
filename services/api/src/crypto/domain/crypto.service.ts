export interface CryptoService {

  hash(payload: string): Promise<string>;
  compare(payload: string, hashed: string): Promise<boolean>;

}
