import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any): Promise<User> {
    const user = await this.userRepository.findOneBy({
      userName: data.userName,
    });
    if (user) throw new ConflictException('Utente già esistente!');
    return this.userRepository.save(data);
  }

  async login(userName: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userName: userName });
    if (!user)
      throw new BadRequestException('Username o password non corretti!');
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Username o password non corretti!');
    }
    return user;
  }

  async getUser(token: string): Promise<User> {
    const user = await this.jwtService.verifyAsync(token);
    return this.userRepository.findOneBy({ id: user.id });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['following', 'followedBy'],
    });
  }

  async getFollowedUsers(user) {
    return user.following;
  }

  async followUser(user, userToFollow) {
    if (user.following) user.following.push({ id: userToFollow.id });
    else user.following = [{ id: userToFollow.id }];
    if (userToFollow.followedBy) userToFollow.followedBy.push({ id: user.id });
    else userToFollow.followedBy = [{ id: user.id }];
    return await this.userRepository.save([user, userToFollow]);
  }

  async unfollowUser(user, userToUnfollow) {
    const indexFollowing = user.following.findIndex(
      (User) => User.id === userToUnfollow.id,
    );
    user.following.splice(indexFollowing, 1);
    const indexFollowedBy = userToUnfollow.followedBy.findIndex(
      (User) => User.id === user.id,
    );
    userToUnfollow.followedBy.splice(indexFollowedBy, 1);
    return await this.userRepository.save([user, userToUnfollow]);
  }
}
