import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { PhrasesModule } from './features/phrases/phrases.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [UsersModule, PhrasesModule, AuthModule],
  providers: [],
})
export class AppModule { }
