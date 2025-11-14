import { Body, Controller, Post } from '@nestjs/common';
import { SesInputDto } from './dto/input.dto';
import { SesOutputDto } from './dto/output.dto';
import { MapperService } from './mapper.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Mapper')
@Controller('mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @Post()
  @ApiOperation({
    summary: 'Transforms a SES event JSON into a structured output',
    description:
      'Receives a full SES event JSON (AWS SES Notification) and maps it to a simplified and normalized output format.',
  })
  @ApiBody({
    type: SesInputDto,
    description: 'Raw SES event JSON received from AWS SES',
  })
  @ApiResponse({
    status: 200,
    description: 'The SES event was successfully mapped.',
    type: SesOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or missing SES structure.',
  })
  transformSes(@Body() input: SesInputDto): SesOutputDto {
    return this.mapperService.transformSes(input);
  }
}
