import { Repository } from 'typeorm';
import { DiagnosisMysqlSchema } from '../../schema/diagnosis-mysql.schema';
import { DiagnosisReportParams } from 'src/modules/diagnosis/domain/diagnosis.params';

export class DiagnosisReportMysqlQuery {
  constructor(private repository: Repository<DiagnosisMysqlSchema>) {}

  async execute(params: DiagnosisReportParams) {
    return this.repository.query(`
      SELECT 
        up.description, 
        up.d_0_6,
        up.d_7_12,
        up.d_13_20,
        up.d_21_25,
        up.d_26_60,
        up.d_61,
        up.d_0_6 + up.d_7_12 + up.d_13_20 + up.d_21_25 + up.d_26_60 + up.d_61 total
      FROM (${this.queryParent(params)}) as up
      ORDER BY up.description 
  `);
  }

  private queryParent(params: DiagnosisReportParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('d')
      .innerJoin('d.diagnosisDetails', 'dd')
      .innerJoin('dd.office', 'o')
      .innerJoin('o.attention', 'a')
      .innerJoin('a.medicalConsultation', 'mc')
      .innerJoin('mc.patient', 'p')
      .select(`d.description as description`)
      .addSelect(`(${this.queryAge(0, 6)})`, 'd_0_6')
      .addSelect(`(${this.queryAge(7, 12)})`, 'd_7_12')
      .addSelect(`(${this.queryAge(13, 20)})`, 'd_13_20')
      .addSelect(`(${this.queryAge(21, 25)})`, 'd_21_25')
      .addSelect(`(${this.queryAge(26, 60)})`, 'd_26_60')
      .addSelect(`(${this.queryAge(61)})`, 'd_61');
    // filters
    queryBuilder.andWhere(
      `DATE(o.datetime) BETWEEN '${params.dateStart}' AND '${params.dateOver}'`,
    );

    if (params.gender) {
      queryBuilder.andWhere(`p.gender = '${params.gender}'`);
    }
    // response
    return queryBuilder.getSql();
  }

  private queryAge(start: number, over?: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('sd')
      .innerJoin('sd.diagnosisDetails', 'sdd')
      .innerJoin('sdd.office', 'so')
      .innerJoin('so.attention', 'sa')
      .innerJoin('sa.medicalConsultation', 'smc')
      .innerJoin('smc.patient', 'sp');
    // filter
    if (typeof start == 'number' && typeof over == 'number') {
      queryBuilder.where(
        `TIMESTAMPDIFF(YEAR, sp.dateOfBirth, CURDATE()) BETWEEN ${start} AND ${over}`,
      );
    } else {
      queryBuilder.where(
        `TIMESTAMPDIFF(YEAR, sp.dateOfBirth, CURDATE()) >= ${start}`,
      );
    }
    // response
    return queryBuilder.andWhere('so.id = o.id').select('COUNT(*)').getSql();
  }
}
