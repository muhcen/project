import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { Body, Inject } from '@nestjs/common/decorators';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from './auth.gurds';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  // @UseGuards(AuthGuard)
  // @Post('/test')
  // async test() {}

  // @MessagePattern('createAuth')
  // create(@Payload() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @MessagePattern('findAllAuth')
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @MessagePattern('findOneAuth')
  // findOne(@Payload() id: number) {
  //   return this.authService.findOne(id);
  // }

  // @MessagePattern('updateAuth')
  // update(@Payload() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(updateAuthDto.id, updateAuthDto);
  // }

  // @MessagePattern('removeAuth')
  // remove(@Payload() id: number) {
  //   return this.authService.remove(id);
  // }
}
