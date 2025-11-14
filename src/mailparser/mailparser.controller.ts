import { Controller, Get, Query } from '@nestjs/common';
import { MailparserService } from './mailparser.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('MailParser')
@Controller('mail-parser')
export class MailparserController {
  constructor(private readonly mailParserService: MailparserService) {}

  @Get()
  @ApiOperation({
    summary: 'Parses an EML file or a remote URL',
    description:
      'Processes an EML file from a local path or a remote URL and extracts JSON objects found inside the email.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Responds with the list of JSON objects found, enumerated in order',
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to process the provided file or URL.',
  })
  parse(@Query('path') path: string) {
    if (!path) return { error: 'You must provide the path to the .eml' };
    const result = this.mailParserService.parseEmailFile(path);
    return result;
  }
}
