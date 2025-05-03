import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/infra/repositories/user.repository';
import { User } from '../entities/user';
import { CryptoService } from 'src/crypto/domain/crypto.service';

@Injectable()
export class UsersService {

    constructor(
        private userRepository: UserRepository,

        @Inject('CryptoService')
        private cryptoService: CryptoService,
    ) {}

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async createUser(user: Partial<User>) {
        // TODO: Validate required fields

        return this.userRepository.createUser({
            ...user,
            password: await this.cryptoService.hash(user.password!),
        });
    }

}
