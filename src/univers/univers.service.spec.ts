import { Test, TestingModule } from '@nestjs/testing';
import { UniversService } from './univers.service';

describe('UniversService', () => {
  let service: UniversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversService],
    }).compile();

    service = module.get<UniversService>(UniversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
