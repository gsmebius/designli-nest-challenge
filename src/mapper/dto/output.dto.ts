import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SesOutputDto {
  @ApiProperty({
    example: true,
    description: 'True if spamVerdict is PASS',
  })
  @Expose()
  @Transform(
    ({ obj }) => obj.Records[0].ses.receipt.spamVerdict.status === 'PASS',
  )
  @IsBoolean()
  spam: boolean;

  @ApiProperty({
    example: false,
    description: 'True if virusVerdict is PASS',
  })
  @Expose()
  @Transform(
    ({ obj }) => obj.Records[0].ses.receipt.virusVerdict.status === 'PASS',
  )
  @IsBoolean()
  virus: boolean;

  @ApiProperty({
    example: true,
    description: 'True if SPF, DKIM, and DMARC are PASS',
  })
  @Expose()
  @Transform(({ obj }) => {
    const r = obj.Records[0].ses.receipt;
    return (
      r.spfVerdict.status === 'PASS' &&
      r.dkimVerdict.status === 'PASS' &&
      r.dmarcVerdict.status === 'PASS'
    );
  })
  @IsBoolean()
  dns: boolean;

  @ApiProperty({
    example: 'September',
    description: 'Month extracted from the email timestamp',
  })
  @Expose()
  @Transform(({ obj }) =>
    new Date(obj.Records[0].ses.mail.timestamp).toLocaleString('en-US', {
      month: 'long',
    }),
  )
  @IsString()
  mes: string;

  @ApiProperty({
    example: false,
    description: 'True if processingTimeMillis > 1000',
  })
  @Expose()
  @Transform(
    ({ obj }) => obj.Records[0].ses.receipt.processingTimeMillis > 1000,
  )
  @IsBoolean()
  retrasado: boolean;

  @ApiProperty({
    example: 'sender',
    description: 'Email username extracted from the source',
  })
  @Expose()
  @Transform(({ obj }) => obj.Records[0].ses.mail.source.split('@')[0])
  @IsString()
  emisor: string;

  @ApiProperty({
    type: [String],
    example: ['recipient1', 'recipient2'],
    description: 'Usernames extracted from recipients',
  })
  @Expose()
  @Transform(({ obj }) =>
    obj.Records[0].ses.mail.destination.map(
      (email: string) => email.split('@')[0],
    ),
  )
  @IsArray()
  @IsString({ each: true })
  receptor: string[];
}
