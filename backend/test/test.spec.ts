import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from '../src/articles/articles.controller';
import { ArticlesService } from '../src/articles/articles.service';
import { Article } from '../src/articles/schemas/article.schema';
import { CreateArticleDto } from '../src/articles/dto/create-article.dto';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of articles', async () => {
    const mockArticles: Partial<Article>[] = [
      {
        title: 'Test Article 1',
        abstract: 'Abstract 1',
        articleType: 'Research',
        publicationDate: '2023-10-22',
        author: 'Author 1',
        createdAt: new Date(),
        moderationStatus: 'pending',
        isSubmitted: false,
      },
    ];
  
    jest.spyOn(service, 'findAll').mockResolvedValue(mockArticles as Article[]);
  
    expect(await controller.getAllArticles()).toBe(mockArticles);
  });
});