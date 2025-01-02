import { Repository } from 'typeorm';
import { PatientMysqlSchema } from '../../schema/patient-mysql.schema';
import { PatientListParams } from 'src/modules/patient/domain/patient.params';

export class PatientSelectMysqlQuery {
  constructor(private repository: Repository<PatientMysqlSchema>) {}

  public query(params: PatientListParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.insuredType', 'i');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`p.id = '${params.id}'`);
    }

    if (params.documentNumber) {
      queryBuilder.andWhere(`p.documentNumber = '${params.documentNumber}'`);
    }

    if (params.historyNumber) {
      queryBuilder.andWhere(`p.historyNumber = '${params.historyNumber}'`);
    }

    if (params.querySearch) {
      queryBuilder.andWhere(
        `(
          CONCAT(p.name, CONCAT(' ', p.lastname)) LIKE '%${params.querySearch}%' OR 
          CONCAT(p.lastname, CONCAT(' ', p.name)) LIKE '%${params.querySearch}%' OR
          CONCAT(p.name, p.lastname) LIKE '%${params.querySearch}%' OR
          CONCAT(p.lastname, p.name) LIKE '%${params.querySearch}%'
        )`,
      );
    }
    // response
    return queryBuilder;
  }
}
