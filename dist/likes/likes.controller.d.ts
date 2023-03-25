import { Request } from 'express';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';
export declare class LikesController {
    private readonly likeService;
    constructor(likeService: LikesService);
    getLikes(postId: any): Promise<string[]>;
    addLike(request: Request, body: CreateLikeDto): Promise<import("./entities/likes.entity").Likes>;
    removeLike(request: Request, body: CreateLikeDto): Promise<import("./entities/likes.entity").Likes>;
}
