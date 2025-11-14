import { Module } from '@nestjs/common';
import { MailparserController } from './mailparser.controller';
import { MailparserService } from './mailparser.service';

@Module({
  controllers: [MailparserController],
  providers: [MailparserService],
})
export class MailparserModule {}
