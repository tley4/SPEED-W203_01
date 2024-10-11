import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  private readonly client: MongoClient;
  private readonly dbName = 'speedDatabase'; // Specify the database name here

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI!);
  }

  async create(createArticleDto: CreateArticleDto) {
    await this.client.connect();
    const db = this.client.db(this.dbName); // Use the specified database
    const articlesCollection = db.collection('articles');

    const newArticle = {
      ...createArticleDto,
      createdAt: new Date(),
    };

    const result = await articlesCollection.insertOne(newArticle);
    await this.client.close();

    return { message: 'Article submitted successfully', articleId: result.insertedId };
  }
}