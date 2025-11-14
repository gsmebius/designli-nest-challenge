import { Test, TestingModule } from '@nestjs/testing';
import { MapperController } from './mapper.controller';

describe('MapperController', () => {
  let controller: MapperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapperController],
    }).compile();

    controller = module.get<MapperController>(MapperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
