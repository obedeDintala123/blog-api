import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Category, PostType } from 'generated/prisma/enums';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  content: any;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsEnum(PostType)
  postType?: PostType;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
