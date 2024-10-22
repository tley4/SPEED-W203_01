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

  // Search articles based on title, SE practice, or publication year
  async searchArticles(
    title?: string,
    sePractice?: string,
    publicationYear?: string,
  ): Promise<Article[]> {
    const query: any = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }

    if (sePractice) {
      query.sePractice = { $regex: sePractice, $options: 'i' }; // Search by SE practice
    }

    if (publicationYear) {
      // Search based on the year portion of the publicationDate string (assuming YYYY-MM-DD format)
      query.publicationDate = { $regex: `^${publicationYear}` }; // Matches strings starting with the year
    }

    return this.articleModel.find(query).exec();
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

  async analystSubmitArticle(
    articleId: string,
    analystComment: string,
  ): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(
      articleId,
      { analystComment: analystComment, isSubmitted: true },
      { new: true },
    );
  }

  async findApproved(): Promise<Article[]> {
    return this.articleModel
      .find({ moderationStatus: 'approved', isSubmitted: false })
      .exec();
  }

  async findSubmittedArticles(): Promise<Article[]> {
    return this.articleModel.find({ isSubmitted: true }).exec();
  }

  async updateRating(articleId: string, newRating: number): Promise<Article> {
    if (newRating < 1 || newRating > 5) {
      throw new Error('Rating must be between 1 and 5'); // Ensure valid ratings
    }

    // Find the article
    const article = await this.articleModel.findById(articleId);

    // Update the ratingSum and ratingCount
    const updatedRatingSum = article.ratingSum + newRating;
    const updatedRatingCount = article.ratingCount + 1;

    // Calculate the new average rating
    const updatedAverageRating = updatedRatingSum / updatedRatingCount;

    // Update the article with the new values
    return await this.articleModel.findByIdAndUpdate(
      articleId,
      {
        ratingSum: updatedRatingSum,
        ratingCount: updatedRatingCount,
        averageRating: updatedAverageRating,
      },
      { new: true }, // Return the updated document
    );
  }
}
