import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './data-source';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot()], // TypeOrmModule.forFeature([User]),
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
