import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public getTokenForUser(user: User) {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }
}
