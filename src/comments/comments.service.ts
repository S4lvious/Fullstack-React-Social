import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/posts/post.service';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comments } from './entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async addComment(data: CreateCommentDto, userId: string) {
    const user = await this.userService.getUserById(userId);
    const post = await this.postService.getPostByPostId(data.postId);
    const desc = data.desc;
    return this.commentRepository.save({ post, user, desc });
  }

  async getComments(postId: any) {
    const res = await this.commentRepository.find({
      relations: ['user', 'post'],
      where: {
        post: {
          id: postId.postId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return res;
  }
}
