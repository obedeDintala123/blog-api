import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
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

  async getPostBySlug(slug: string, userId?: number) {
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
        likedBy: userId ? { where: { id: userId } } : false,
      },
    });

    return {
      ...post,
      likedByMe: userId ? post!.likedBy.length > 0 : false,
      likedBy: undefined,
    };
  }

  async setLike(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingLike = await this.prisma.post.findFirst({
      where: {
        id: postId,
        likedBy: { some: { id: userId } },
      },
    });

    if (existingLike) {
      await this.prisma.post.update({
        where: { id: postId },
        data: { likedBy: { disconnect: { id: userId } } },
      });
      return { liked: false };
    }

    await this.prisma.post.update({
      where: { id: postId },
      data: { likedBy: { connect: { id: userId } } },
    });

    return { liked: true };
  }
}
