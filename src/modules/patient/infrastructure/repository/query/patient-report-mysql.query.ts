import { Repository } from 'typeorm';
import { PatientMysqlSchema } from '../../schema/patient-mysql.schema';
import { PatientReportParams } from 'src/modules/patient/domain/patient.params';

export class PatientReportMysqlQuery {
  constructor(private repository: Repository<PatientMysqlSchema>) {}

  public query(params: PatientReportParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('p')
      .innerJoin('p.medicalConsultations', 'm')
      .innerJoin('m.attentions', 'a')
      .innerJoin('a.office', 'o')
      .groupBy(`p.name, p.lastname, rangeAge`)
      .orderBy(`p.name, p.lastname, rangeAge`).select(`
        p.name name,
        p.lastname lastname,
        CASE
          WHEN TIMESTAMPDIFF(YEAR, p.dateOfBirth, CURDATE()) BETWEEN 0 AND 6 THEN '0-6'
          WHEN TIMESTAMPDIFF(YEAR, p.dateOfBirth, CURDATE()) BETWEEN 7 AND 12 THEN '7-12'
          WHEN TIMESTAMPDIFF(YEAR, p.dateOfBirth, CURDATE()) BETWEEN 13 AND 20 THEN '13-20'
          WHEN TIMESTAMPDIFF(YEAR, p.dateOfBirth, CURDATE()) BETWEEN 21 AND 25 THEN '21-25'
          WHEN TIMESTAMPDIFF(YEAR, p.dateOfBirth, CURDATE()) BETWEEN 26 AND 60 THEN '26-60'
          WHEN TIMESTAMPDIFF(YEAR, p.dateOfBirth, CURDATE()) > 60 THEN '+60'
        END AS rangeAge,
        COUNT(DISTINCT o.id) total
      `);
    // filters
    queryBuilder.andWhere(
      `DATE(o.datetime) BETWEEN '${params.dateStart}' AND '${params.dateOver}'`,
    );

    if (params.gender) {
      queryBuilder.andWhere(`p.gender = '${params.gender}'`);
    }
    // response
    return queryBuilder;
  }
}
