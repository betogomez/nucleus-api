import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

export class GetUsersUseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async execute(): Promise<User[]> {
    return await this.userRepo.findAll();
  }
}
