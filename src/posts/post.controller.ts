import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { IPayload } from 'src/auth/strategies/jwt.strategy';
import { JwtGuard } from 'src/guards/jwt.guards';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post('add')
  async addPost(@Req() request: Request, @Body() body: CreatePostDto) {
    const userId = request.user as IPayload;
    try {
      this.postService.addPost(body, userId.id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtGuard)
  @Get('getPostByUserId')
  async getPostByUserId(@Req() request: Request) {
    try {
      const userId = request.user as IPayload;
      return await this.postService.getPostByUserId(userId.id);
    } catch (error) {
      throw error;
    }
  }

  @Get('getProfilePost/:userId')
  async getProfilePost(@Param('userId') params: string) {
    return await this.postService.getPostByUserId(params);
  }

  @UseGuards(JwtGuard)
  @Get('getPost')
  async getPost(@Req() request: Request) {
    const userId = request.user as IPayload;
    return await this.postService.getPost(userId.id);
  }
}
