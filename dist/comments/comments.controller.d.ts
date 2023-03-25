import { Request } from 'express';
import { UserService } from 'src/users/user.service';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentService;
    private readonly userService;
    constructor(commentService: CommentsService, userService: UserService);
    getComments(postId: string): Promise<import("./entities/comments.entity").Comments[]>;
    addComment(request: Request, body: CreateCommentDto): Promise<void>;
}
