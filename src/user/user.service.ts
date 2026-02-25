import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dtos/post';
import { slugify } from 'utils/slugify';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
        comments: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createPost(data: CreatePostDto, userId: number) {
    const post = await this.prisma.post.create({
      data: { ...data, authorId: userId, slug: slugify(data.title) },
    });

    return { post };
  }
}
