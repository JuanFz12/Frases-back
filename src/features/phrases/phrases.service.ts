import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Phrase } from './entities/phrase.entity';
import { PaginationDto } from '../common';

@Injectable()
export class PhrasesService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  async create(createPhraseDto: CreatePhraseDto) {
    try {
      const phrase = await this.prismaService.phrase.create({
        data: createPhraseDto,
      });
      return Phrase.toJson(phrase);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const phrases = await this.prismaService.phrase.findMany({
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
      });
      const totalPhrases = await this.prismaService.phrase.count();
      return {
        phrases: phrases.map(phrase => Phrase.toJson(phrase)),
        pagination: {
          page: paginationDto.page,
          limit: paginationDto.limit,
          totalPages: Math.ceil(totalPhrases / paginationDto.limit),
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const phrase = await this.prismaService.phrase.findUnique({
        where: { id },
      });
      if (!phrase) {
        throw new NotFoundException(`Phrase with ID ${id} not found`);
      }
      return Phrase.toJson(phrase);
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updatePhraseDto: UpdatePhraseDto) {
    try {
      const phrase = await this.prismaService.phrase.update({
        where: { id },
        data: { ...updatePhraseDto },
      });
      return Phrase.toJson(phrase);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const phrase = await this.prismaService.phrase.delete({
        where: { id },
      });
      return Phrase.toJson(phrase);
    } catch (error) {
      throw error;
    }
  }

  async findRandom() {
    try {
      const phrases = await this.prismaService.phrase.findMany();
      if (phrases.length === 0) {
        throw new NotFoundException('No phrases found');
      }
      const randomIndex = Math.floor(Math.random() * phrases.length);
      const { updatedAt, ...restPhrase } = Phrase.toJson(phrases[randomIndex])
      return restPhrase;
    } catch (error) {
      throw error;
    }
  }
}
