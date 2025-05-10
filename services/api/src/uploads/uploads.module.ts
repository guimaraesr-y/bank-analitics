import { Module } from '@nestjs/common';
import { PrivateController } from './private.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    PrivateController,
  ]
})
export class UploadsModule {}
