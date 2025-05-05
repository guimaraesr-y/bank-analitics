import { Inject, Injectable } from '@nestjs/common';
import { BaseUserInterface, User } from 'src/users/domain/entities/user';
import { UsersService } from 'src/users/domain/services/users.service';
import { InvalidCredentialsException } from 'src/auth/interface/exceptions/invalid-credentials.exception';
import { CryptoService } from 'src/crypto/domain/crypto.service';
import { JwtService } from 'src/crypto/domain/jwt.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,

        @Inject('CryptoService')
        private cryptoService: CryptoService,
        
        @Inject('JwtService')
        private jwtService: JwtService,
    ) { }

    async getUser(id: string): Promise<User | null> {
        return this.usersService.findById(id);
    }

    async signIn(email: string, password: string): Promise<string> {
        const user = await this.usersService.findByEmail(email);

        if (
            !user ||
            !(await this.cryptoService.compare(password, user.password))
        ) {
            throw new InvalidCredentialsException();
        };

        return this.jwtService.sign({ id: user.id });
    }

    async signUp(createUser: BaseUserInterface): Promise<User> {
        return this.usersService.createUser(createUser);
    }

}
