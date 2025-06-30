import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from '../../infrastructure/auth/google-auth.guard';
import { LoginWithGoogleUseCase } from '../../application/use-cases/login-with-google.usecase';
import { JwtService } from '@nestjs/jwt';
import { UserPrismaRepository } from '../../infrastructure/prisma/user-prisma.repository';

@Controller('auth')
export class AuthController {
  private readonly loginUseCase: LoginWithGoogleUseCase;

  constructor(
    private jwtService: JwtService,
    private userRepo: UserPrismaRepository,
  ) {
    this.loginUseCase = new LoginWithGoogleUseCase(this.userRepo, this.jwtService);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // handled by guard
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request) {
    const user = req.user as any;

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: token };
  }
}
