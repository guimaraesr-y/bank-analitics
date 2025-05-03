import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { CryptoService } from 'src/crypto/domain/crypto.service';

@Injectable()
export class BcryptAdapter implements CryptoService {
  
  private readonly saltRounds = 10;
  
  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.saltRounds);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
  
}
