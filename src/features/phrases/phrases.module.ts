import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PhrasesController],
  providers: [PhrasesService],
  imports: [PrismaModule, AuthModule]
})
export class PhrasesModule { }
