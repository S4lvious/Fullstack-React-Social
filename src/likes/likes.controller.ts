import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { IPayload } from 'src/auth/strategies/jwt.strategy';
import { JwtGuard } from 'src/guards/jwt.guards';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
  @Get('getLikes')
  async getLikes(@Query('postId') postId) {
    const res = await this.likeService.getLikesByPostId(postId);
    return res;
  }

  @UseGuards(JwtGuard)
  @Post('addLike')
  async addLike(@Req() request: Request, @Body() body: CreateLikeDto) {
    const userId = request.user as IPayload;
    return await this.likeService.addLike(body, userId.id);
  }

  @UseGuards(JwtGuard)
  @Delete('removeLike')
  async removeLike(@Req() request: Request, @Body() body: CreateLikeDto) {
    return await this.likeService.removeLike(body);
  }
}
