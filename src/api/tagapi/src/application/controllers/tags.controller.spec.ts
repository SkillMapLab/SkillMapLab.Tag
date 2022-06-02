import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controllers';
import { TagsService } from '../tags.service';

describe('AppController', () => {
  let tagController: TagsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService],
    }).compile();

    tagController = app.get<TagsController>(TagsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tagController.findAll()).toBe('This action returns all cats');
    });
  });
});
