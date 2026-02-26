import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dtos/post';
import { slugify } from 'utils/slugify';
import { PostsGateway } from 'src/post/posts.gateway';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly postsGateway: PostsGateway,
  ) {}
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
    this.postsGateway.emitNewPost(post);
    return { post };
  }
}
