import { Test, TestingModule } from '@nestjs/testing';
import { MailparserController } from './mailparser.controller';

describe('MailparserController', () => {
  let controller: MailparserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailparserController],
    }).compile();

    controller = module.get<MailparserController>(MailparserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
