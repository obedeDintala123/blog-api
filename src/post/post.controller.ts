import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @HttpCode(HttpStatus.OK)
  @Get('public')
  async getPublicPosts() {
    return await this.postService.getPublicPosts();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return await this.postService.getPostBySlug(slug);
  }
}
