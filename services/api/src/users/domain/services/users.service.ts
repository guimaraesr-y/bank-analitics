import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/infra/repositories/user.repository';
import { User } from '../entities/user';

@Injectable()
export class UsersService {

    constructor(private userRepository: UserRepository) {}

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async createUser(user: Partial<User>) {
        return this.userRepository.createUser(user);
    }

}
