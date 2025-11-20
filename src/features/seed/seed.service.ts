import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { phrases } from './data/phrases';
import { users } from './data/users';
import { envs } from 'src/config';

@Injectable()
export class SeedService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async populate() {
    try {
      if (envs.nodeEnv !== 'development') {
        throw new BadRequestException('El seed solo se puede ejecutar en desarrollo');
      }
      await this.prismaService.phrase.deleteMany();
      await this.prismaService.user.deleteMany();
      await this.prismaService.user.createMany({ data: users });
      await this.prismaService.phrase.createMany({ data: phrases });
      return { message: 'Seed executed successfully' };
    } catch (error) {
      throw error;
    }
  }
}