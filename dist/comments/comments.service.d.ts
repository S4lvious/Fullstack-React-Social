import { PostService } from 'src/posts/post.service';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comments } from './entities/comments.entity';
export declare class CommentsService {
    private readonly commentRepository;
    private readonly userService;
    private readonly postService;
    constructor(commentRepository: Repository<Comments>, userService: UserService, postService: PostService);
    addComment(data: CreateCommentDto, userId: string): Promise<{
        post: import("../posts/entities/post.entity").Post;
        user: import("../users/entities/user.entity").User;
        desc: string;
    } & Comments>;
    getComments(postId: any): Promise<Comments[]>;
}
