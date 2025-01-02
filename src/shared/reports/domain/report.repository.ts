import { PDFOptions } from 'puppeteer';
import { ReportEntity } from './report.entity';

export interface ReportRepository {
  render<T>(path: string, data: T, options?: PDFOptions): Promise<ReportEntity>;
}

export interface ReportClientRepository<T> {
  render(data: T): Promise<ReportEntity>;
}
