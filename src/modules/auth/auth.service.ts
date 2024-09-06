import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/user/create-user.dto';

// interface create a files for that

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username, password) {
    const user = await this.userService.findOneBy(username);
    console.log('user', user);

    if (!user) throw new UnauthorizedException({ error: 'no va funcionar' });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = {  email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(payload: CreateUserDto) {
    const user = await this.userService.create(payload);

    return user;
  }
}
