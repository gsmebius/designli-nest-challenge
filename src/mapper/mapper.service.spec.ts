import { Test, TestingModule } from '@nestjs/testing';
import { MapperService } from './mapper.service';
import { SesInputDto } from './dto/input.dto';
import {
  sesEventMock,
  sesEventFailMock,
} from './test/__mocks__/ses-event.mock';
import { expectedOutputMock } from './test/__fixtures__/expected-output.mock';

describe('MapperService', () => {
  let service: MapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapperService],
    }).compile();

    service = module.get<MapperService>(MapperService);
  });

  it('It should be defined', () => {
    expect(service).toBeDefined();
  });

  it('It should correctly transform a valid SES event', () => {
    const result = service.transformSes(sesEventMock as SesInputDto);

    expect(result.spam).toBe(expectedOutputMock.spam);
    expect(result.virus).toBe(expectedOutputMock.virus);
    expect(result.dns).toBe(expectedOutputMock.dns);
    expect(result.retrasado).toBe(expectedOutputMock.retrasado);
    expect(result.emisor).toBe(expectedOutputMock.emisor);
    expect(result.receptor).toEqual(expectedOutputMock.receptor);
    expect(typeof result.mes).toBe('string');
  });

  it('It should correctly handle FAIL values', () => {
    const result = service.transformSes(sesEventFailMock as SesInputDto);

    expect(result.spam).toBe(false);
    expect(result.virus).toBe(false);
    expect(result.dns).toBe(false);
    expect(result.retrasado).toBe(false);
    expect(result.emisor).toBe('failer');
    expect(result.receptor).toEqual(['receiver']);
  });

  it('It should return null if the input is null', () => {
    const result = service.transformSes(null as any);
    expect(result).toBeNull();
  });
});
