import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CrudService } from '../crud/crud.service';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService extends CrudService<User, UserDto> {
  constructor(
    @InjectModel(User) model: ReturnModelType<typeof User>
  ) {
    super(model);
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.find({ username });
  }

  async createUser(user: UserDto): Promise<Partial<User>> {
    const createdUser = await this.create(user);
    return {
      id: createdUser.id,
      username: createdUser.username
    }
  }
  
  async deleteAllUsers(): Promise<{ n?: number; ok?: number}> {
    return this.removeAll();
  }
}
