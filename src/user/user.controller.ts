import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreatePostDto } from './dtos/post';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('post')
  @UseGuards(AuthGuard)
  async createPost(@Body() body: CreatePostDto, @Request() req) {
    return await this.userService.createPost(body, req.user.sub);
  }
}
