import { Module } from '@nestjs/common';
import { BcryptAdapter } from './infra/adapters/bcrypt.adapter';
import { JwtAdapter } from './infra/adapters/jwt.adapter';

@Module({
  imports: [],
  providers: [
    {
      provide: 'CryptoService',
      useClass: BcryptAdapter,
    },
    {
      provide: 'JwtService',
      useClass: JwtAdapter,
    }
  ],
  exports: [
    'CryptoService',
    'JwtService',
  ]
})
export class CryptoModule {}
