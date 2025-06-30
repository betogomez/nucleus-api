import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
