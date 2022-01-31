import {Test, TestingModule} from '@nestjs/testing';
import {VeggieController} from './veggie.controller';

describe('VeggieController', () => {
  let controller: VeggieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeggieController],
    }).compile();

    controller = module.get<VeggieController>(VeggieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
