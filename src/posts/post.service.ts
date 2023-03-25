import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async addPost(post: CreatePostDto, userId: string): Promise<Post> {
    try {
      const user = await this.userService.getUserById(userId);
      return this.postRepository.save({ ...post, user });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getPostByPostId(id: string) {
    return await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getPost(id: string) {
    const { following } = await this.userRepository.findOne({
      relations: ['following'],
      where: {
        id: id,
      },
      select: ['following'],
    });
    try {
      return await this.postRepository.find({
        relations: ['user'],
        where: [
          { user: { id: id } },
          { user: { id: In(following.map(({ id }) => id)) } },
        ],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPostByUserId(id: string) {
    try {
      const res = await this.postRepository.find({
        relations: ['user'],
        where: {
          user: { id: id },
        },
        order: {
          createdAt: 'DESC',
        },
      });
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  }
}
