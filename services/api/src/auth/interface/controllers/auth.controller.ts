import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInDto } from '../serializers/signin.dto';
import { SignInResponse } from '../serializers/signin.response';
import { SignUpResponse } from '../serializers/signup.response';
import { SignUpDto } from '../serializers/signup.dto';

@Controller('auth')
export class AuthController {

    constructor() {}

    @Get()
    getCurrentUser(): string {
        return 'Hello World!';
    }

    @Post('/signin')
    signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
        // TODO: Return a JWT
        return Promise.resolve({ accessToken: '123' });
    }

    @Post('/signup')
    signUp(@Body() signInDto: SignUpDto): Promise<SignUpResponse> {
        // TODO: Return a JWT with the user data
        return Promise.resolve({ accessToken: '123' } as SignUpResponse);
    }

}
