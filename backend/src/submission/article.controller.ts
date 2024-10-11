import { Controller, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

  @Post('submit')
  async submitArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.submitArticle(createArticleDto);
  }
}
