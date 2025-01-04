import { Edge } from 'edge.js';
import { ReportEntity } from '../../domain/report.entity';
import { ReportRepository } from '../../domain/report.repository';
import puppeteer, { PDFOptions } from 'puppeteer';
import { resolve } from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportPuppeteerRepository implements ReportRepository {
  constructor() {
    this.edge = new Edge({ cache: false });
    this.edge.mount(resolve(__dirname, '../../../../../src/modules'));
  }

  private edge: Edge;

  async render<T>(
    path: string,
    data: T,
    options?: PDFOptions,
  ): Promise<ReportEntity> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    const content = await this.edge.render(path, data);
    await page.setContent(content);

    const buffer = await page.pdf({
      printBackground: true,
      margin: {
        left: '10px',
        top: '10px',
        right: '10px',
        bottom: '30px',
      },
      ...options,
    });

    await browser.close();

    return {
      type: 'application/pdf',
      buffer,
    };
  }
}
