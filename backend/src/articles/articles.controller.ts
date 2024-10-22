import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
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

  @Patch(':id/analyst-submit')
  async analystSubmitArticle(
    @Param('id') id: string,
    @Body('analystComment') analystComment: string,
  ) {
    return this.articlesService.analystSubmitArticle(id, analystComment); // Use the renamed service method
  }

  @Get('approved')
  async getApprovedArticles() {
    return this.articlesService.findApproved();
  }

  @Get('submitted')
  async getSubmittedArticles() {
    return this.articlesService.findSubmittedArticles();
  }

  @Patch(':id/rating')
  async updateRating(@Param('id') id: string, @Body('rating') rating: number) {
    return this.articlesService.updateRating(id, rating);
  }
}
