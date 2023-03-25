"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("../posts/entities/post.entity");
const post_service_1 = require("../posts/post.service");
const user_entity_1 = require("../users/entities/user.entity");
const user_module_1 = require("../users/user.module");
const user_service_1 = require("../users/user.service");
const likes_entity_1 = require("./entities/likes.entity");
const likes_controller_1 = require("./likes.controller");
const likes_service_1 = require("./likes.service");
let LikesModule = class LikesModule {
};
LikesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([likes_entity_1.Likes, user_entity_1.User, post_entity_1.Post]),
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: 'secret',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [likes_service_1.LikesService, user_service_1.UserService, post_service_1.PostService],
        controllers: [likes_controller_1.LikesController],
    })
], LikesModule);
exports.LikesModule = LikesModule;
//# sourceMappingURL=likes.module.js.map