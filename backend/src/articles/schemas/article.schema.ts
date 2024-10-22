import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'articles' })
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  abstract: string;

  @Prop({ required: false })
  doi?: string; // Optional if not always present

  @Prop({ required: false })
  keywords?: string; // Optional if not always present

  @Prop({ required: true })
  articleType: string;

  @Prop({ required: true })
  publicationDate: string; // Storing as string for now, convert to Date if needed

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ default: 'pending' }) // Default value set to 'pending'
  moderationStatus: string; // New moderation status field

  @Prop()
  analystComment?: string; // Field to store analyst's comments

  @Prop({ default: false })
  isSubmitted: boolean; // Indicates if the article has been finalized by an analyst

}

export const ArticleSchema = SchemaFactory.createForClass(Article);
