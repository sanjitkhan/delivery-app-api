import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user: User = await this.userService.findUserByUsername(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserDto) {
    const isUserPresent = await this.userService.findUserByUsername(user.username);
    if(!isUserPresent) {
      const createdUser = await this.userService.createUser(user);
      const payload = { username: createdUser.username, sub: createdUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new BadRequestException("Username already exists!");
    }
  }
}