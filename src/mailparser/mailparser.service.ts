import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { simpleParser, ParsedMail } from 'mailparser';
import * as path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

@Injectable()
export class MailparserService {
  private readonly JSON_REGEX = /\.json$/i;
  private readonly URL_REGEX = /(https?:\/\/[^\s]+)/g;

  constructor() {}

  async parseEmailFile(filePathOrUrl: string): Promise<any> {
    let emailContent: string;

    if (filePathOrUrl.startsWith('http')) {
      try {
        const response = await axios.get<string>(filePathOrUrl, {
          responseType: 'text',
        });
        emailContent = response.data;
      } catch (error) {
        throw new BadRequestException(
          `Could not access the EML file from the URL: ${filePathOrUrl}, error: ${(error as Error).message}`,
        );
      }
    } else {
      try {
        const fullPath = path.resolve(process.cwd(), filePathOrUrl);
        emailContent = await fs.readFile(fullPath, 'utf-8');
      } catch (error) {
        throw new BadRequestException(
          `Could not access the EML file from the URL:: ${filePathOrUrl}, error: ${(error as Error).message}`,
        );
      }
    }
    const mail = await this.safeParse(emailContent);
    if (!mail) return { message: 'Process finished', result: [] };
    const rawResults = await this.extractJsonFromMail(mail);
    const formattedResults = rawResults.map((item, index) => ({
      json_number: index + 1,
      ...item,
    }));

    return {
      message: 'Process finished',
      result: formattedResults,
    };
  }

  private async safeParse(content: string): Promise<ParsedMail | null> {
    try {
      return await simpleParser(content);
    } catch (e) {
      console.error('Error parsing email:', e);
      return null;
    }
  }

  private async extractJsonFromMail(mail: ParsedMail): Promise<any[]> {
    const results: any[] = [];

    for (const att of mail.attachments || []) {
      if (att.filename && this.JSON_REGEX.test(att.filename)) {
        try {
          const parsed = JSON.parse(att.content.toString('utf-8'));
          results.push(parsed);
        } catch {
          console.warn(`Adjunto inválido: ${att.filename}`);
        }
      }
      if (
        att.contentDisposition === 'attachment' &&
        att.contentType.startsWith('text/')
      ) {
        const textContent = att.content.toString('utf-8');
        const links = this.extractUrls(textContent);
        const jsons = await this.processLinks(links);
        results.push(...jsons);
      }
    }

    if (typeof mail.text === 'string') {
      const links = this.extractUrls(mail.text);
      const jsons = await this.processLinks(links);
      results.push(...jsons);
    }
    if (typeof mail.html === 'string') {
      const links = this.extractUrls(mail.html, true);
      const jsons = await this.processLinks(links);
      results.push(...jsons);
    }

    return results;
  }

  private extractUrls(content: string, isHtml = false): string[] {
    if (isHtml) {
      const $ = cheerio.load(content);
      const links: string[] = [];
      $('a').each((_, el) => {
        const href = $(el).attr('href');
        if (href) links.push(href);
      });
      return links;
    }

    const matches = content.match(this.URL_REGEX);
    return matches ?? [];
  }

  private async processLinks(links: string[]): Promise<any[]> {
    const results: any[] = [];
    const uniqueLinks = Array.from(new Set(links));

    for (const link of uniqueLinks) {
      if (this.JSON_REGEX.test(link)) {
        const json = await this.fetchAndParseJson(link);
        if (json) results.push(json);
      } else {
        const json = await this.searchJsonInIntermediatePage(link);
        if (json) results.push(json);
      }
    }

    return results;
  }

  private async fetchAndParseJson(url: string): Promise<any | null> {
    try {
      const response = await axios.get<unknown>(url);
      if (
        response &&
        typeof response.data === 'object' &&
        response.data !== null
      ) {
        return response.data;
      }
      if (typeof response.data === 'string') {
        try {
          return JSON.parse(response.data);
        } catch {
          return null;
        }
      }
    } catch (e) {
      console.error(`Error fetching JSON: ${url}`, (e as Error).message);
    }
    return null;
  }

  private async searchJsonInIntermediatePage(
    pageUrl: string,
  ): Promise<any | null> {
    if (!pageUrl.startsWith('http')) return null;

    try {
      const response = await axios.get<string>(pageUrl);

      if (response.headers['content-type']?.includes('application/json')) {
        try {
          return typeof response.data === 'string'
            ? JSON.parse(response.data)
            : response.data;
        } catch {
          return null;
        }
      }

      const $ = cheerio.load(response.data);
      let jsonLink: string | null = null;

      $('a').each((_, el) => {
        const href = $(el).attr('href');
        if (href) {
          const absoluteUrl = new URL(href, pageUrl).href;
          if (this.JSON_REGEX.test(absoluteUrl)) {
            jsonLink = absoluteUrl;
            return false;
          }
        }
      });

      if (jsonLink) return this.fetchAndParseJson(jsonLink);
    } catch (e) {
      console.error(
        `Error processing intermediate page: ${pageUrl}`,
        (e as Error).message,
      );
    }

    return null;
  }
}
