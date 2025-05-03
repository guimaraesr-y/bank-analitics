import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { JwtService, JWTSignOptions } from 'src/crypto/domain/jwt.service';

@Injectable()
export class JwtAdapter implements JwtService {

  private readonly secret: string;

  constructor(private readonly configService: ConfigService) {
    let secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      secret = 'json-web-token-secret';
    }

    this.secret = secret;
  }

  sign(payload: string | object, options?: JWTSignOptions): string {
    return sign(
      payload,
      this.secret,
      options as SignOptions
    );
  }

  verify(token: string): string | object {
    return verify(token, this.secret);
  }

}
