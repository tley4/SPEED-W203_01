import { Schema, Document } from 'mongoose';

export interface Article extends Document {
  title: string;
  abstract: string;
  doi: string;
  keywords: string;
  articleType: string;
  publicationDate: Date;
  author: string;
}

export const ArticleSchema = new Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  doi: { type: String, required: true },
  keywords: { type: String, required: true },
  articleType: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  author: { type: String, required: true },
});