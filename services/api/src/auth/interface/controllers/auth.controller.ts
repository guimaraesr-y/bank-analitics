import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignInDto } from '../serializers/signin.dto';
import { SignInResponse } from '../serializers/signin.response';
import { SignUpResponse } from '../serializers/signup.response';
import { SignUpDto } from '../serializers/signup.dto';
import { AuthService } from 'src/auth/domain/services/auth.service';
import { BasicUserResponse } from 'src/users/interface/serializers/basic-user.response';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/domain/entities/user';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard)
    @Get()
    getCurrentUser(@Req() req): BasicUserResponse {
        return new BasicUserResponse(req.user);
    }

    @Post('/signin')
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
        const token = await this.authService.signIn(signInDto.email, signInDto.password);
        return Promise.resolve({ accessToken: token });
    }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
        const user = await this.authService.signUp(signUpDto);
        const token = await this.authService.signIn(signUpDto.email, signUpDto.password);
        const filteredUser = new BasicUserResponse(user);

        return { 
            ...filteredUser,
            accessToken: token 
        };
    }

}
