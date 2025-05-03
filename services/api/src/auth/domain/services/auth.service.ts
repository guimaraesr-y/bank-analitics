import { Injectable } from '@nestjs/common';
import { BaseUserInterface } from 'src/users/domain/entities/user';
import { UsersService } from 'src/users/domain/services/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if(!user) return null;

        if (user.password === password) {
            return user; // TODO: Return a JWT
        }

        return null;
    }

    async signUp(createUser: BaseUserInterface) {
        return this.usersService.createUser(createUser);
    }

}
