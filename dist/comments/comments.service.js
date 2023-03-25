"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_service_1 = require("../posts/post.service");
const user_service_1 = require("../users/user.service");
const typeorm_2 = require("typeorm");
const comments_entity_1 = require("./entities/comments.entity");
let CommentsService = class CommentsService {
    constructor(commentRepository, userService, postService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
    }
    async addComment(data, userId) {
        const user = await this.userService.getUserById(userId);
        const post = await this.postService.getPostByPostId(data.postId);
        const desc = data.desc;
        return this.commentRepository.save({ post, user, desc });
    }
    async getComments(postId) {
        const res = await this.commentRepository.find({
            relations: ['user', 'post'],
            where: {
                post: {
                    id: postId.postId,
                },
            },
            order: {
                createdAt: 'DESC',
            },
        });
        return res;
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comments_entity_1.Comments)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        post_service_1.PostService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map