import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs, } from "src/config";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './types';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserStatus } from '@prisma/client';
import { User } from 'src/features/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envs.jwtSecret,
        });
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;
        const user = await this.prisma.user.findUnique({ where: { id: +id }, omit: { password: true, createdAt: true, updatedAt: true } });
        if (!user) throw new UnauthorizedException('Token not valid');
        if (user.status !== UserStatus.ACTIVE) throw new UnauthorizedException('User is inactive, talk with an admin');
        return User.toJson(user);
    }
}