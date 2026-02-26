import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dtos/auth';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(data: LoginDTO, @Res() response: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payLoad = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const token = this.jwt.sign(payLoad);

    return response.status(200).send({ token });
  }
}
