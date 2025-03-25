import { Test, TestingModule } from '@nestjs/testing';
import { PaimentsController } from './paiments.controller';
import { PaimentsService } from './paiments.service';

describe('PaimentsController', () => {
  let controller: PaimentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaimentsController],
      providers: [PaimentsService],
    }).compile();

    controller = module.get<PaimentsController>(PaimentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
