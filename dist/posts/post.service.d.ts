import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
export declare class PostService {
    private readonly postRepository;
    private readonly userRepository;
    private readonly userService;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>, userService: UserService);
    addPost(post: CreatePostDto, userId: string): Promise<Post>;
    getPostByPostId(id: string): Promise<Post>;
    getPost(id: string): Promise<Post[]>;
    getPostByUserId(id: string): Promise<Post[]>;
}
