import { Test, TestingModule } from '@nestjs/testing';
import { MailparserService } from './mailparser.service';
import * as fs from 'fs/promises';
import axios from 'axios';
import { simpleParser } from 'mailparser';
import { parsedMailMock } from './test/__mocks__/mailparser.mock';
import { expectedOutput } from './test/__fixtures__/expected-output.mock';
import { mockAxiosGet } from './test/__mocks__/axios.mock';

jest.mock('axios');
jest.mock('fs/promises');
jest.mock('mailparser', () => ({
  simpleParser: jest.fn(),
}));

describe('MailparserService', () => {
  let service: MailparserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailparserService],
    }).compile();

    service = module.get(MailparserService);

    (axios.get as jest.Mock) = mockAxiosGet;
    (fs.readFile as jest.Mock).mockResolvedValue('mock email content');
    (simpleParser as jest.Mock).mockResolvedValue(parsedMailMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('parseEmailFile', () => {
    it('It should correctly parse the email and return the JSONs found', async () => {
      const result = await service.parseEmailFile('mock.eml');

      const stripNumbers = (arr: any[]) =>
        arr.map(({ json_number, ...rest }) => rest);

      expect(result.message).toBe('Process finished');
      expect(result.result).toHaveLength(expectedOutput.result.length);
      expect(stripNumbers(result.result)).toEqual(
        expect.arrayContaining(stripNumbers(expectedOutput.result)),
      );
    });

    it('It should throw an error if the file does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValueOnce(new Error('File not found'));

      await expect(service.parseEmailFile('notfound.eml')).rejects.toThrow(
        /Could not access the EML file/,
      );
    });

    it('It should correctly parse the email from a remote URL', async () => {
      const mockUrl = 'https://example.com/email.eml';
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: 'remote email content' });
      (simpleParser as jest.Mock).mockResolvedValue(parsedMailMock);

      const result = await service.parseEmailFile(mockUrl);

      expect(result.message).toBe('Process finished');
      expect(Array.isArray(result.result)).toBe(true);
      expect(result.result.length).toBeGreaterThan(0);
    });
  });
});
