import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Comments {
    id: string;
    desc: string;
    createdAt: Date;
    post: Post;
    user: User;
}
