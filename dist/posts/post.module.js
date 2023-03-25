"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const likes_entity_1 = require("../likes/entities/likes.entity");
const likes_service_1 = require("../likes/likes.service");
const user_entity_1 = require("../users/entities/user.entity");
const user_module_1 = require("../users/user.module");
const user_service_1 = require("../users/user.service");
const post_entity_1 = require("./entities/post.entity");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, user_entity_1.User, likes_entity_1.Likes]),
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: 'secret',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [post_service_1.PostService, user_service_1.UserService, likes_service_1.LikesService],
        controllers: [post_controller_1.PostController],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map