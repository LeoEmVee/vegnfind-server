import {Test, TestingModule} from '@nestjs/testing';
import {CategoryController} from './category.controller';
import {CategoryService} from '../services/category/category.service';

describe('AppController', () => {
  let appController: CategoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    appController = app.get<CategoriesController>(CategoriesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
