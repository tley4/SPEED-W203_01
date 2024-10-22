export class CreateArticleDto {
  _id: string;
  title: string;
  abstract: string;
  doi?: string;
  keywords?: string;
  articleType: string;
  publicationDate: string;
  author: string;
  createdAt: Date;
  status: string;
  analystComment?: string;
  isSubmitted: boolean;
}
