import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(data: any): Promise<User>;
    login(userName: string, password: string): Promise<User>;
    getUser(token: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    getFollowedUsers(user: any): Promise<any>;
    followUser(user: any, userToFollow: any): Promise<any[]>;
    unfollowUser(user: any, userToUnfollow: any): Promise<any[]>;
}
