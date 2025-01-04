import { Injectable } from '@nestjs/common';
import { ReportEdgeRepository } from 'src/shared/reports/infrastructure/repository/report-edge.repository';
import { DiagnosisMysqlRepository } from 'src/modules/diagnosis/infrastructure/repository/diagnosis-mysql-repository';
import { DiagnosisReportParams } from 'src/modules/diagnosis/domain/diagnosis.params';
import { DateTime } from 'luxon';
import { ReportPuppeteerRepository } from 'src/shared/reports/infrastructure/repository/report-puppeteer.repository';

@Injectable()
export class ReportDiagnosisPdfReport {
  constructor(
    private diagnosisRepository: DiagnosisMysqlRepository,
    private reportRepository: ReportPuppeteerRepository,
  ) {}

  async execute(params: DiagnosisReportParams) {
    const data = await this.diagnosisRepository.listReport(params);

    const toDate = (value: string) =>
      DateTime.fromSQL(value).toFormat('dd/MM/yyyy');

    return this.reportRepository.render(
      'reports/infrastructure/reports/resources/report-diagnosis',
      { data, params, toDate },
      { landscape: true },
    );
  }
}
