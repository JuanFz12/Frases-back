import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { PaginationDto } from '../common';
import { Auth } from '../auth/decorators';

@Controller('phrases')
export class PhrasesController {
  constructor(private readonly phrasesService: PhrasesService) { }

  @Post()
  @Auth()
  create(@Body() createPhraseDto: CreatePhraseDto) {
    return this.phrasesService.create(createPhraseDto);
  }
  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.phrasesService.findAll(paginationDto);
  }
  @Get('random')
  getRandomExample() {
    return this.phrasesService.findRandom();
  }
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phrasesService.findOne(+id);
  }
  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updatePhraseDto: UpdatePhraseDto) {
    return this.phrasesService.update(+id, updatePhraseDto);
  }
  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.phrasesService.remove(+id);
  }


}
