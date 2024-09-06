import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserDocument, User } from '../../entities/user.schema';
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
    try {
      const test = new this.userRepository({
        ...createUserDto,
        // createdAt: new Date(),
      });

      return await test.save();
    } catch (error) {
      console.error('Error saving entity:', error);
      throw error;
    }
  }
}
