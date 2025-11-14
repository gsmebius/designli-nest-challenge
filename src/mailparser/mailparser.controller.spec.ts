import { Test, TestingModule } from '@nestjs/testing';
import { MailparserController } from './mailparser.controller';
import { MailparserService } from './mailparser.service';

describe('MailparserController', () => {
  let controller: MailparserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailparserController],
      providers: [MailparserService],
    }).compile();

    controller = module.get<MailparserController>(MailparserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
