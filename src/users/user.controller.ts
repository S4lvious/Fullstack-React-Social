import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/guards/jwt.guards';
import { IPayload } from 'src/auth/strategies/jwt.strategy';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('userName') userName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const saltOrRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return this.userService.register({
      name,
      userName,
      email,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.login(userName, password);
    const token = await this.jwtService.signAsync({ id: user.id });
    const { password: pw, ...others } = user;
    response.cookie('accessToken', token, { httpOnly: true }).json(others);
  }

  @UseGuards(JwtGuard)
  @Post('follow')
  async follow(@Body('id') id: string, @Req() request: Request) {
    const userToFollow = await this.userService.getUserById(id);
    const userId = request.user as IPayload;
    const user = await this.userService.getUserById(userId.id);
    return this.userService.followUser(user, userToFollow);
  }

  @UseGuards(JwtGuard)
  @Post('unfollow')
  async unfollow(@Body('id') id: string, @Req() request: Request) {
    const userToUnfollow = await this.userService.getUserById(id);
    const userId = request.user as IPayload;
    const user = await this.userService.getUserById(userId.id);
    return this.userService.unfollowUser(user, userToUnfollow);
  }

  @Get('find/:userId')
  async find(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Req() request: Request) {
    const userId = request.user as IPayload;
    const user = await this.userService.getUserById(userId.id);
    if (user) return null;
  }
}
