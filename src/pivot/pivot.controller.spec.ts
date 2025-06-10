import { Test, TestingModule } from '@nestjs/testing';
import { PivotController } from './pivot.controller';

describe('PivotController', () => {
  let controller: PivotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PivotController],
    }).compile();

    controller = module.get<PivotController>(PivotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
