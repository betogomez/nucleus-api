import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.email, user.name, user.picture, user.createdAt);
  }

  async create(data: { email: string; name: string; picture: string }): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return new User(user.id, user.email, user.name, user.picture, user.createdAt);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u: any) => new User(u.id, u.email, u.name, u.picture, u.createdAt));
  }
}
