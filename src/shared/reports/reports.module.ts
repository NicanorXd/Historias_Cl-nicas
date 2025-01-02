import { Module } from '@nestjs/common';
import { ReportPuppeteerRepository } from './infrastructure/repository/report-puppeteer.repository';
import { ReportEdgeRepository } from './infrastructure/repository/report-edge.repository';

@Module({
  providers: [ReportPuppeteerRepository, ReportEdgeRepository],
  exports: [ReportPuppeteerRepository, ReportEdgeRepository],
})
export class ReportsModule {}
