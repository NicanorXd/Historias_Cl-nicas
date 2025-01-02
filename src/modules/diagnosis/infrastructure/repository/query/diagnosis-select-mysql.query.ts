import { Repository } from 'typeorm';
import { DiagnosisMysqlSchema } from '../../schema/diagnosis-mysql.schema';
import { DiagnosisListParams } from 'src/modules/diagnosis/domain/diagnosis.params';

export class DiagnosisSelectMysqlQuery {
  constructor(private repository: Repository<DiagnosisMysqlSchema>) {}

  public query(params: DiagnosisListParams) {
    const queryBuilder = this.repository.createQueryBuilder('d');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`d.id = '${params.id}'`);
    }

    if (params.cie10) {
      queryBuilder.andWhere(`d.cie10 = '${params.cie10}'`);
    }

    if (params.querySearch) {
      queryBuilder.andWhere(`d.description LIKE '%${params.querySearch}%'`);
    }
    // response
    return queryBuilder;
  }
}
