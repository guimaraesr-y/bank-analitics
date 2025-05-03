import { Injectable } from '@nestjs/common';
import { User } from "src/users/domain/entities/user";

@Injectable()
export class UsersService {

    constructor() {}

    async findByEmail(email: string) {
        return new User();
    }

}
