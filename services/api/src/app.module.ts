import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports:      [ConfigModule],
      inject:       [ConfigService],
      useFactory: (config: ConfigService) => ({
        type:        'postgres',
        url:         config.get<string>('DATABASE_URL'),
        entities:    [join(__dirname, '..', '**', '*.entity.js')],
        synchronize: config.get<boolean>('DB_SYNC', true),
      }),
    }),
  ], // TypeOrmModule.forFeature([User]),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
