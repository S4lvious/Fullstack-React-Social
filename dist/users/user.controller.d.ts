import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(name: string, userName: string, email: string, password: string): Promise<import("./entities/user.entity").User>;
    login(userName: string, password: string, response: Response): Promise<void>;
    follow(id: string, request: Request): Promise<any[]>;
    unfollow(id: string, request: Request): Promise<any[]>;
    find(userId: string): Promise<import("./entities/user.entity").User>;
    logout(request: Request): Promise<any>;
}
