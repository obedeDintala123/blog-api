import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PostModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
