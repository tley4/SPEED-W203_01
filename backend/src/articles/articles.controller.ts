import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }

  @Get('search')
  async searchArticles(
    @Query('title') title: string,
    @Query('sePractice') sePractice: string,
    @Query('publicationYear') publicationYear: string,
  ) {
    return this.articlesService.searchArticles(
      title,
      sePractice,
      publicationYear,
    );
  }

  @Post('submit')
  async submitArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }
}
