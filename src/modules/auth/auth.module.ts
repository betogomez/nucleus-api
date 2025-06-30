import { Module } from '@nestjs/common';
import { AuthController } from '../../interfaces/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthGuard } from '../../infrastructure/auth/google-auth.guard';
import { UserPrismaRepository } from '../../infrastructure/prisma/user-prisma.repository';
import { PrismaService } from '../../prisma.service';
import { GoogleStrategy } from '../../infrastructure/auth/google.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleAuthGuard, UserPrismaRepository, PrismaService, GoogleStrategy,],
})
export class AuthModule { }
