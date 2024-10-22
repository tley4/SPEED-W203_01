export class CreateArticleDto {
  _id: string;
  title: string;
  abstract: string;
  doi?: string;
  sePractice?: string;
  articleType: string;
  publicationDate: string;
  author: string;
  createdAt: Date;
  moderationStatus: string = 'pending';
  analystComment?: string;
  isSubmitted: boolean = false;
  ratingSum: number = 0;
  ratingCount: number = 0;
  averageRating: number | null = null;
}
