import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInDto } from '../serializers/signin.dto';
import { SignInResponse } from '../serializers/signin.response';
import { SignUpResponse } from '../serializers/signup.response';
import { SignUpDto } from '../serializers/signup.dto';
import { AuthService } from 'src/auth/domain/services/auth.service';
import { BasicUserResponse } from 'src/users/interface/serializers/basic-user.response';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get()
    getCurrentUser(): string {
        return 'Hello World!';
    }

    @Post('/signin')
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
        const token = await this.authService.signIn(signInDto.email, signInDto.password);
        return Promise.resolve({ accessToken: token });
    }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
        const user = await this.authService.signUp(signUpDto);
        console.log(signUpDto, user);
        const token = await this.authService.signIn(signUpDto.email, signUpDto.password);
        const filteredUser = new BasicUserResponse(user);

        return Promise.resolve({ 
            ...filteredUser,
            accessToken: token 
        });
    }

}
