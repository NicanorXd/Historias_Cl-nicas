import { Injectable } from '@nestjs/common';
import { OfficeFindParams } from '../../domain/office.params';
import { OfficeMysqlRepository } from '../repository/office-mysql-repository';
import { ReportEdgeRepository } from 'src/shared/reports/infrastructure/repository/report-edge.repository';
import { DateTime } from 'luxon';

@Injectable()
export class OfficeRecetaHtmlReport {
  constructor(
    private officeRepostiory: OfficeMysqlRepository,
    private reportRepository: ReportEdgeRepository,
  ) {}

  async execute(params: OfficeFindParams) {
    const office = await this.officeRepostiory.findOffice(params);

    const toDate = (value: string) =>
      DateTime.fromSQL(value).toFormat('dd/MM/yyyy');

    const birthday = () => {
      const currentDate = DateTime.now();
      const birthdayDate = DateTime.fromISO(
        office.attention.medicalConsultation.patient.dateOfBirth,
      );
      const diff = currentDate.diff(birthdayDate, 'years').years;
      return Math.floor(diff);
    };

    const datetime = DateTime.fromJSDate(office.datetime as any).toFormat(
      'dd/MM/yyyy',
    );

    return this.reportRepository.render(
      'office/infrastructure/reports/resources/office-receta',
      { office, datetime, toDate, birthday },
    );
  }
}
