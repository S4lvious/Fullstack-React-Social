import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Likes {
    id: string;
    likedAt: Date;
    user: User;
    post: Post;
}
