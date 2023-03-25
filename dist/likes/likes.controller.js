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
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guards_1 = require("../guards/jwt.guards");
const create_like_dto_1 = require("./dto/create-like.dto");
const likes_service_1 = require("./likes.service");
let LikesController = class LikesController {
    constructor(likeService) {
        this.likeService = likeService;
    }
    async getLikes(postId) {
        const res = await this.likeService.getLikesByPostId(postId);
        return res;
    }
    async addLike(request, body) {
        const userId = request.user;
        return await this.likeService.addLike(body, userId.id);
    }
    async removeLike(request, body) {
        return await this.likeService.removeLike(body);
    }
};
__decorate([
    (0, common_1.Get)('getLikes'),
    __param(0, (0, common_1.Query)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "getLikes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    (0, common_1.Post)('addLike'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_like_dto_1.CreateLikeDto]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "addLike", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    (0, common_1.Delete)('removeLike'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_like_dto_1.CreateLikeDto]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "removeLike", null);
LikesController = __decorate([
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [likes_service_1.LikesService])
], LikesController);
exports.LikesController = LikesController;
//# sourceMappingURL=likes.controller.js.map