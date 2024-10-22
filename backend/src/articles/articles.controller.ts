import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './schemas/article.schema'; // Import your Article schema

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Submit an article
  @Post('submit')
  async submitArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  // Approve an article
  @Patch(':id/approve')
  async approveArticle(@Param('id') id: string) {
    return this.articlesService.approveArticle(id);
  }

  // Reject an article
  @Patch(':id/reject')
  async rejectArticle(@Param('id') id: string) {
    return this.articlesService.rejectArticle(id);
  }

  // Fetch all articles
  @Get()
  async getAllArticles() {
    return this.articlesService.findAll();
  }

  // Fetch pending articles
  @Get('pending')
  async getPendingArticles() {
    return this.articlesService.findPending();
  }
}
