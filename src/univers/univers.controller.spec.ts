import { Test, TestingModule } from '@nestjs/testing';
import { UniversController } from './univers.controller';
import { UniversService } from './univers.service';

describe('UniversController', () => {
  let controller: UniversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversController],
      providers: [UniversService],
    }).compile();

    controller = module.get<UniversController>(UniversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
