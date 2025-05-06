import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from 'src/crypto/domain/jwt.service';
import { AuthService } from './domain/services/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OperationsGuard implements CanActivate {

  constructor(
    private configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token || this.getWorkerToken() !== token) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getWorkerToken(): string {
    return this.configService.get<string>('WORKER_TOKEN') || '';
  }
}
