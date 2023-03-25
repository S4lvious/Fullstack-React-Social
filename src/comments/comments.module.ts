import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/entities/user.entity';
import { PostService } from 'src/posts/post.service';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments, User, Post]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [CommentsService, UserService, PostService],
  controllers: [CommentsController],
})
export class CommentsModule {}
