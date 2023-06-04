import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    if (await this.usersService.findOne(createUserDto.email))
      return new BadRequestException('user with this email already exists');

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.usersService.create(createUserDto);

    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.email);

    if (!user)
      return new BadRequestException('user with this email not exists');

    const isMatch = await bcrypt.compare(createUserDto.password, user.password);

    if (!isMatch) return new BadRequestException('password not correct');

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
