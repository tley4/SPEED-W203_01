export class CreateArticleDto {
    title: string;
    abstract: string;
    doi?: string; // Optional field
    sePractice: string;
    articleType: string;
    publicationDate: string; // Store as a string or Date, depending the your schema
    author: string;
  }