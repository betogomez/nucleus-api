import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

interface CreateUserDTO {
  email: string;
  name: string;
  picture: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async execute(data: CreateUserDTO): Promise<User> {
    return await this.userRepo.create(data);
  }
}
