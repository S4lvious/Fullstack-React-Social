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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_service_1 = require("../posts/post.service");
const user_service_1 = require("../users/user.service");
const typeorm_2 = require("typeorm");
const likes_entity_1 = require("./entities/likes.entity");
let LikesService = class LikesService {
    constructor(likesRepository, userService, postService) {
        this.likesRepository = likesRepository;
        this.userService = userService;
        this.postService = postService;
    }
    async getLikesByPostId(postId) {
        const res = await this.likesRepository.find({
            relations: ['user'],
            where: {
                post: {
                    id: postId,
                },
            },
        });
        const data = res.map((response) => response.user.id);
        return data;
    }
    async addLike(body, userId) {
        try {
            const user = await this.userService.getUserById(userId);
            const post = await this.postService.getPostByPostId(body.postId);
            return this.likesRepository.save({ post, user });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async removeLike(body) {
        try {
            const like = await this.likesRepository.findOne({
                relations: ['post'],
                where: {
                    post: {
                        id: body.postId,
                    },
                },
            });
            return this.likesRepository.remove(like);
        }
        catch (error) {
            throw error;
        }
    }
};
LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(likes_entity_1.Likes)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        post_service_1.PostService])
], LikesService);
exports.LikesService = LikesService;
//# sourceMappingURL=likes.service.js.map