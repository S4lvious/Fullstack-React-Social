import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/posts/post.service';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Likes } from './entities/likes.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async getLikesByPostId(postId: string) {
    const res = await this.likesRepository.find({
      relations: ['user'],
      where: {
        post: {
          id: postId,
        },
      },
    });
    const data = res.map((response) => response.user.id);
    return data;
  }

  async addLike(body: CreateLikeDto, userId: string): Promise<Likes> {
    try {
      const user = await this.userService.getUserById(userId);
      const post = await this.postService.getPostByPostId(body.postId);
      return this.likesRepository.save({ post, user });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeLike(body: CreateLikeDto) {
    try {
      const like = await this.likesRepository.findOne({
        relations: ['post'],
        where: {
          post: {
            id: body.postId,
          },
        },
      });
      return this.likesRepository.remove(like);
    } catch (error) {
      throw error;
    }
  }
}
