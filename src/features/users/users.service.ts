import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { User } from './entities/user.entity';
import { PaginationDto } from '../common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: { ...createUserDto, password: bcrypt.hashSync(createUserDto.password, 10) },
        omit: { password: true, createdAt: true, updatedAt: true }
      });
      return User.toJson(user);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const users = await this.prismaService.user.findMany({
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
        omit: { password: true, createdAt: true, updatedAt: true }
      });
      const totalUsers = await this.prismaService.user.count();
      return {
        users: users.map(user => User.toJson(user)),
        pagination: {
          page: paginationDto.page,
          limit: paginationDto.limit,
          totalPages: Math.ceil(totalUsers / paginationDto.limit),
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        omit: { password: true, createdAt: true, updatedAt: true }
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return User.toJson(user);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { password, ...rest } = updateUserDto;
      const user = await this.prismaService.user.update({
        where: { id },
        data: { ...rest, ...(password && { password: bcrypt.hashSync(password, 10) }) },
        omit: { password: true, createdAt: true, updatedAt: true }
      });
      return User.toJson(user);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      throw error;
    }
  }
}
