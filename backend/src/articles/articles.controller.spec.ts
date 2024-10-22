import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';  

describe('ArticlesController', () => {
  let articlesController: ArticlesController;
  let articlesService: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            create: jest.fn(),
            approveArticle: jest.fn(),
            rejectArticle: jest.fn(),
            findAll: jest.fn(),
            findPending: jest.fn(),
            findApproved: jest.fn(),
            analystSubmitArticle: jest.fn(),
          },
        },
      ],
    }).compile();

    articlesController = module.get<ArticlesController>(ArticlesController);
    articlesService = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(articlesController).toBeDefined();
  });

  describe('approveArticle', () => {
    it('should call articlesService.approveArticle with the correct ID', async () => {
      const id = 'some-id';
      await articlesController.approveArticle(id);
      expect(articlesService.approveArticle).toHaveBeenCalledWith(id);
    });
  });

  describe('rejectArticle', () => {
    it('should call articlesService.rejectArticle with the correct ID', async () => {
      const id = 'some-id';
      await articlesController.rejectArticle(id);
      expect(articlesService.rejectArticle).toHaveBeenCalledWith(id);
    });
  });

  describe('getAllArticles', () => {
    it('should call articlesService.findAll', async () => {
      await articlesController.getAllArticles();
      expect(articlesService.findAll).toHaveBeenCalled();
    });
  });

  describe('getPendingArticles', () => {
    it('should call articlesService.findPending', async () => {
      await articlesController.getPendingArticles();
      expect(articlesService.findPending).toHaveBeenCalled();
    });
  });

  describe('analystSubmitArticle', () => {
    it('should call articlesService.analystSubmitArticle with the correct params', async () => {
      const id = 'some-id';
      const analystComment = 'Comment by the analyst';
      await articlesController.analystSubmitArticle(id, analystComment);
      expect(articlesService.analystSubmitArticle).toHaveBeenCalledWith(id, analystComment);
    });
  });

  describe('getApprovedArticles', () => {
    it('should call articlesService.findApproved', async () => {
      await articlesController.getApprovedArticles();
      expect(articlesService.findApproved).toHaveBeenCalled();
    });
  });
});