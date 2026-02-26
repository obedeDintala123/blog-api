import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsGateway } from './posts.gateway';

@Module({
  providers: [PostService, PrismaService, PostsGateway],
  controllers: [PostController],
  exports: [PostsGateway],
})
export class PostModule {}
