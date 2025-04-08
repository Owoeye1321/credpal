import { Test, TestingModule } from '@nestjs/testing';
import { FxController } from '../../src/fx/fx.controller';
import { FxService } from '../../src/fx/fx.service';

describe('FxController', () => {
  let controller: FxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxController],
      providers: [FxService],
    }).compile();

    controller = module.get<FxController>(FxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
