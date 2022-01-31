import {Test, TestingModule} from '@nestjs/testing';
import {VeggieService} from './veggie.service';

describe('UserService', () => {
  let service: VeggieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeggieService],
    }).compile();

    service = module.get<VeggieService>(VeggieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
