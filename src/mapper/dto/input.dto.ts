import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class VerdictDto {
  @ApiProperty({ example: 'PASS', description: 'Verdict status' })
  @Expose()
  @IsString()
  status: string;
}

class ReceiptDto {
  @ApiProperty({ example: 524, description: 'Processing time in ms' })
  @Expose()
  @IsNumber()
  processingTimeMillis: number;

  @ApiProperty({ type: VerdictDto })
  @Expose()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ApiProperty({ type: VerdictDto })
  @Expose()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ApiProperty({ type: VerdictDto })
  @Expose()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ApiProperty({ type: VerdictDto })
  @Expose()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ApiProperty({ type: VerdictDto })
  @Expose()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;

  @ApiProperty({
    type: [String],
    required: false,
    example: ['recipient@example.com'],
  })
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  recipients?: string[];
}

class MailDto {
  @ApiProperty({
    example: '2025-02-03T10:45:00.000Z',
    description: 'Timestamp of the received email',
  })
  @Expose()
  @IsString()
  timestamp: string;

  @ApiProperty({
    example: 'sender@example.com',
    description: 'Sender email',
  })
  @Expose()
  @IsString()
  source: string;

  @ApiProperty({
    type: [String],
    example: ['recipient@example.com'],
  })
  @Expose()
  @IsArray()
  @IsString({ each: true })
  destination: string[];

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  messageId?: string;
}

export class SesEventDto {
  @ApiProperty({ type: ReceiptDto })
  @Expose()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ApiProperty({ type: MailDto })
  @Expose()
  @Type(() => MailDto)
  mail: MailDto;
}

export class RecordDto {
  @ApiProperty({ type: SesEventDto })
  @Expose()
  @Type(() => SesEventDto)
  ses: SesEventDto;

  @ApiProperty({
    required: false,
    example: 'aws:ses',
  })
  @Expose()
  @IsOptional()
  @IsString()
  eventSource?: string;
}

export class SesInputDto {
  @ApiProperty({
    type: [RecordDto],
    description: 'Array of SES event records',
  })
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => RecordDto)
  Records: RecordDto[];
}
