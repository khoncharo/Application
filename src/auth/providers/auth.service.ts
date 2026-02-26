import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/providers/prisma.service';
import { CreateAuthDto } from '../dto/CreateAuth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signIn() {}

  signUp(createAuthDto: CreateAuthDto) {}

  logout() {}

  refreshToekn() {}
}
