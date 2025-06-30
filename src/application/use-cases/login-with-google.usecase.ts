import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

interface GoogleProfile {
  email: string;
  name: string;
  picture: string;
}

export class LoginWithGoogleUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async execute(profile: GoogleProfile): Promise<string> {
    let user = await this.userRepo.findByEmail(profile.email);

    if (!user) {
      user = await this.userRepo.create({
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
      });
    }

    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}
