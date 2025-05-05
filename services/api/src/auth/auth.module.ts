import { Module } from '@nestjs/common';
import { AuthController } from './interface/controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { BrokerModule } from 'src/broker/broker.module';

@Module({
  imports: [
    UsersModule,
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
