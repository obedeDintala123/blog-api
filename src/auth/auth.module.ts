import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: String(process.env.SECRET),
      signOptions: {
        expiresIn: 60 * 60 * 24,
      },
    }),
    PostModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
})
export class AuthModule {}
