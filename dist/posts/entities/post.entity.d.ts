import { User } from 'src/users/entities/user.entity';
export declare class Post {
    id: string;
    desc: string;
    img?: string;
    createdAt: Date;
    user: User;
}
