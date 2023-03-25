import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { IPayload } from 'src/auth/strategies/jwt.strategy';
import { JwtGuard } from 'src/guards/jwt.guards';
import { UserService } from 'src/users/user.service';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentService: CommentsService,
    private readonly userService: UserService,
  ) {}

  @Get('getComments')
  async getComments(@Query() postId: string) {
    return await this.commentService.getComments(postId);
  }

  @UseGuards(JwtGuard)
  @Post('add')
  async addComment(@Req() request: Request, @Body() body: CreateCommentDto) {
    const userId = request.user as IPayload;
    try {
      const user = await this.userService.getUserById(userId.id);
      this.commentService.addComment(body, user.id);
    } catch (error) {
      throw error;
    }
  }
}
