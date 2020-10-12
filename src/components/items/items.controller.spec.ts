import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let itemsController: ItemsController;

  beforeEach(async () => {
    const items: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    itemsController = items.get<ItemsController>(ItemsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(itemsController.getAllItems()).toBe('Get all items');
    });
  });
});
