import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

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
  async getPostBySlug(
    @Param('slug') slug: string,
    @CurrentUser('id') userId?: number,
  ) {
    return await this.postService.getPostBySlug(slug, userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':id/like')
  @UseGuards(AuthGuard)
  async setLike(
    @Param('id', ParseIntPipe) postId: number,
    @CurrentUser('id', ParseIntPipe) userId: number,
  ) {
    return this.postService.setLike(postId, userId);
  }
}
