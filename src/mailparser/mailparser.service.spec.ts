import { Test, TestingModule } from '@nestjs/testing';
import { MailparserService } from './mailparser.service';

describe('MailparserService', () => {
  let service: MailparserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailparserService],
    }).compile();

    service = module.get<MailparserService>(MailparserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
