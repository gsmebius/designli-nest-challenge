import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapperModule } from './mapper/mapper.module';
import { MailparserModule } from './mailparser/mailparser.module';

@Module({
  imports: [MapperModule, MailparserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
