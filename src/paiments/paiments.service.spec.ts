import { Test, TestingModule } from '@nestjs/testing';
import { PaimentsService } from './paiments.service';

describe('PaimentsService', () => {
  let service: PaimentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaimentsService],
    }).compile();

    service = module.get<PaimentsService>(PaimentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
