import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseUser } from 'src/dto/user/base-user.dto';
import { Response } from 'express';
import { Public } from './public-strategy';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  async login(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    console.log('login');
    const token = await this.authService.login(
      signInDto.username,
      signInDto.password,
    );

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).send('invalid credentials');
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: ' User Singup' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  async signUp(@Body() signUpDto: Record<string, any>) {
    const payLoad = {
      username: signUpDto.username,
      email: signUpDto.email,
      password: signUpDto.password,
      confirmPassword:signUpDto.password,
      createdAt: new Date(),
    };

    const test= await this.authService.singUp(payLoad);
    console.log('test', test)
    return test;
  }
}
