import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { PhrasesModule } from './features/phrases/phrases.module';
import { AuthModule } from './features/auth/auth.module';
import { SeedModule } from './features/seed/seed.module';

@Module({
  imports: [UsersModule, PhrasesModule, AuthModule, SeedModule],
  providers: [],
})
export class AppModule { }
