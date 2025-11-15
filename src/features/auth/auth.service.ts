import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { LoginUserDto, } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';


@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) { }




  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      omit: { createdAt: true, updatedAt: true }
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');
    return {
      user: User.toJson(user),
      token: this.getJwtToken({ id: user.id.toString() })
    };
  }

  async checkAuthStatus(user: User) {

    return {
      user: user,
      token: this.getJwtToken({ id: user.id.toString() })
    };

  }



  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;

  }

}
