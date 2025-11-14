import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SesInputDto } from './dto/input.dto';
import { SesOutputDto } from './dto/output.dto';

@Injectable()
export class MapperService {
  transformSes(input: SesInputDto): SesOutputDto {
    try {
      const result = plainToInstance(SesOutputDto, input, {
        excludeExtraneousValues: true,
      }) as SesOutputDto;
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        `${error} Error in the trasnform mapper process`,
      );
    }
  }
}
