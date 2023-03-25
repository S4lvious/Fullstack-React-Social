import { PostService } from 'src/posts/post.service';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Likes } from './entities/likes.entity';
export declare class LikesService {
    private readonly likesRepository;
    private readonly userService;
    private readonly postService;
    constructor(likesRepository: Repository<Likes>, userService: UserService, postService: PostService);
    getLikesByPostId(postId: string): Promise<string[]>;
    addLike(body: CreateLikeDto, userId: string): Promise<Likes>;
    removeLike(body: CreateLikeDto): Promise<Likes>;
}
