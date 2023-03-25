import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: 'secret',
      ignoreExpiration: false,
      jwtFromRequest: (req) =>
        req && req.cookies ? req.cookies['accessToken'] : null,
    });
  }

  validate(payload: IPayload) {
    return payload;
  }
}

export interface IPayload {
  id: string;
  iat: number;
  exp: number;
}
