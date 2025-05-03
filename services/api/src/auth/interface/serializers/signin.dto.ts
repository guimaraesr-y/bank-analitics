import { BaseUserInterface } from "src/users/domain/entities/user";

export class SignInDto implements Pick<BaseUserInterface, 'email' | 'password'> {

    email: string;
    password: string;

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }

}
