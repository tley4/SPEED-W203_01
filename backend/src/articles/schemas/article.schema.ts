import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  abstract: string;

  @Prop()
  doi: string;

  @Prop({ required: true })
  keywords: string;

  @Prop({ required: true })
  articleType: string;

  @Prop({ required: true })
  publicationDate: Date;

  @Prop({ required: true })
  author: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);