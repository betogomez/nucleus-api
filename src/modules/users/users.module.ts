import { Module } from '@nestjs/common';
import { UsersController } from '../../interfaces/controllers/users.controller';
import { UserPrismaRepository } from '../../infrastructure/prisma/user-prisma.repository';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UserPrismaRepository, PrismaService],
})
export class UsersModule { }
