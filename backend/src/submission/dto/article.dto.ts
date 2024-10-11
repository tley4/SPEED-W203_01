// create-article.dto.ts
export class CreateArticleDto {
    title: string;
    abstract: string;
    doi?: string;
    keywords: string;
    articleType: string;
    publicationDate: Date;
    author: string;
  }  