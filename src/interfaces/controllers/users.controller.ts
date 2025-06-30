import { Controller, Get, Post, Body } from '@nestjs/common';
import { GetUsersUseCase } from '../../application/use-cases/get-users.usecase';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UserPrismaRepository } from '../../infrastructure/prisma/user-prisma.repository';

@Controller('users')
export class UsersController {
  private readonly getUsers: GetUsersUseCase;
  private readonly createUser: CreateUserUseCase;

  constructor(private readonly userRepo: UserPrismaRepository) {
    this.getUsers = new GetUsersUseCase(userRepo);
    this.createUser = new CreateUserUseCase(userRepo);
  }

  @Get()
  async findAll() {
    return this.getUsers.execute();
  }

  @Post()
  async create(@Body() body: { email: string; name: string; picture: string }) {
    return this.createUser.execute(body);
  }
}
