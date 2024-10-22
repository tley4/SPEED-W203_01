import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'articles' })
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  abstract: string;

  @Prop({ required: false })
  doi?: string;

  @Prop({ required: false })
  keywords?: string;

  @Prop({ required: true })
  articleType: string;

  @Prop({ required: true })
  publicationDate: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ default: 'pending' })
  moderationStatus: string;

  @Prop()
  analystComment?: string;

  @Prop({ default: false })
  isSubmitted: boolean;

  @Prop({ default: 0 })
  ratingSum: number;

  @Prop({ default: 0 })
  ratingCount: number;

  @Prop({ default: null })
  averageRating: number | null;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
