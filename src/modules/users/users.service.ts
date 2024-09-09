import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserDocument, User } from '../../entities/user.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<UserDocument>,
  ) {}

  async findOneBy(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email: email });
  }

  async create(createUserDto: CreateUserDto) {
    // const { email, password, confirmPassword } = createUserDto;
    // const userExisting = await this.userRepository.findOne({ email: email });

    // if (userExisting) {
    //   return console.log('this user already exist');
    // }

    // const hashedPassword = await bcrypt.hash(password, 10);
try {

  const userCreated = new this.userRepository({
    ...createUserDto,
    // hashedPassword,
    // confirmPassword: hashedPassword,
  });

  return await userCreated.save();


}catch(error){
  console.log('error')


}
    
  }
}
