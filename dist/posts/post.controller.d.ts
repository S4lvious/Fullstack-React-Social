import { Request } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    addPost(request: Request, body: CreatePostDto): Promise<void>;
    getPostByUserId(request: Request): Promise<import("./entities/post.entity").Post[]>;
    getProfilePost(params: string): Promise<import("./entities/post.entity").Post[]>;
    getPost(request: Request): Promise<import("./entities/post.entity").Post[]>;
}
