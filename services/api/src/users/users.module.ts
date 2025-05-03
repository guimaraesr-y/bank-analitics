import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/entities/user.entity';
import { UserRepository } from './infra/repositories/user.repository';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CryptoModule,
  ],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
