import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import * as bcrypt from 'bcrypt';

// interface create a files for that

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username, password) {
    console.log('urser', username);
    const user = await this.userService.findOneBy(username);
    console.log('urser', user);

    if (!user) throw new UnauthorizedException();

    // if (user?.password !== password) {
    //   throw new UnauthorizedException({message: 'wrong password'});
    // }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) return 'Incorrect Password , try again ';

    const payload = {
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(payload: CreateUserDto) {
    const user = await this.userService.create(payload);

    return user;
  }
}
