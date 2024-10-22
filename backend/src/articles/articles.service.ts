import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec(); // Fetch all articles
  }

  // Fetch only pending articles based on moderationStatus
  async findPending(): Promise<Article[]> {
    return this.articleModel.find({ moderationStatus: 'pending' }).exec();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel({
      ...createArticleDto,
      moderationStatus: 'pending', // Ensure this is set to pending during creation
      createdAt: new Date(),
    });
    return await newArticle.save();
  }

  // Approve an article by updating the moderationStatus
  async approveArticle(articleId: string): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(
      articleId,
      { moderationStatus: 'approved' },
      { new: true },
    );
  }

  // Reject an article by updating the moderationStatus
  async rejectArticle(articleId: string): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(
      articleId,
      { moderationStatus: 'rejected' },
      { new: true },
    );
  }
}
