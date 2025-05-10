import { join } from 'path';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from './crypto/crypto.module';
import { BrokerModule } from './broker/broker.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [join(__dirname, '..', '**', '*.entity.js')],
        synchronize: config.get<boolean>('DB_SYNC', true),
      }),
    }),
    CryptoModule,
    BrokerModule,
    UploadsModule,
  ],
})
export class AppModule {}
