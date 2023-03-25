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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(data) {
        const user = await this.userRepository.findOneBy({
            userName: data.userName,
        });
        if (user)
            throw new common_1.ConflictException('Utente già esistente!');
        return this.userRepository.save(data);
    }
    async login(userName, password) {
        const user = await this.userRepository.findOneBy({ userName: userName });
        if (!user)
            throw new common_1.BadRequestException('Username o password non corretti!');
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.BadRequestException('Username o password non corretti!');
        }
        return user;
    }
    async getUser(token) {
        const user = await this.jwtService.verifyAsync(token);
        return this.userRepository.findOneBy({ id: user.id });
    }
    async getUserById(id) {
        return this.userRepository.findOne({
            where: {
                id: id,
            },
            relations: ['following', 'followedBy'],
        });
    }
    async getFollowedUsers(user) {
        return user.following;
    }
    async followUser(user, userToFollow) {
        if (user.following)
            user.following.push({ id: userToFollow.id });
        else
            user.following = [{ id: userToFollow.id }];
        if (userToFollow.followedBy)
            userToFollow.followedBy.push({ id: user.id });
        else
            userToFollow.followedBy = [{ id: user.id }];
        return await this.userRepository.save([user, userToFollow]);
    }
    async unfollowUser(user, userToUnfollow) {
        const indexFollowing = user.following.findIndex((User) => User.id === userToUnfollow.id);
        user.following.splice(indexFollowing, 1);
        const indexFollowedBy = userToUnfollow.followedBy.findIndex((User) => User.id === user.id);
        userToUnfollow.followedBy.splice(indexFollowedBy, 1);
        return await this.userRepository.save([user, userToUnfollow]);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map