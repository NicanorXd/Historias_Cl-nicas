import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { ReportPuppeteerRepository } from 'src/shared/reports/infrastructure/repository/report-puppeteer.repository';
import { PatientMysqlRepository } from 'src/modules/patient/infrastructure/repository/patient-mysql-repository';
import { PatientReportParams } from 'src/modules/patient/domain/patient.params';

@Injectable()
export class ReportPatientPdfReport {
  constructor(
    private patientRepository: PatientMysqlRepository,
    private reportRepository: ReportPuppeteerRepository,
  ) {}

  async execute(params: PatientReportParams) {
    const data = await this.patientRepository.listReport(params);

    const toDate = (value: string) =>
      DateTime.fromSQL(value).toFormat('dd/MM/yyyy');

    return this.reportRepository.render(
      'reports/infrastructure/reports/resources/report-patient',
      { data, params, toDate },
      { landscape: true },
    );
  }
}
