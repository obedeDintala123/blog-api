import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async getPublicPosts() {
    const posts = await this.prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },

        comments: {
          select: {
            author: true,
          },
        },

        _count: {
          select: {
            comments: true,
            likedBy: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return { posts };
  }

  async getPostBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },

        _count: {
          select: {
            likedBy: true,
            comments: true,
          },
        },
      },
    });

    return post;
  }
}
