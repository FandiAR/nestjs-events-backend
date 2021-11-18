import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
