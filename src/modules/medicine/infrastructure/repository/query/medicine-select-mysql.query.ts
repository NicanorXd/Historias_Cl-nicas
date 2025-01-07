import { Repository } from 'typeorm';
import { MedicineMysqlSchema } from '../../schema/medicine-mysql.schema';
import { MedicineListParams } from 'src/modules/medicine/domain/medicine.params';

export class MedicineSelectMysqlQuery {
  constructor(private repository: Repository<MedicineMysqlSchema>) {}

  public query(params: MedicineListParams) {
    const queryBuilder = this.repository.createQueryBuilder('m');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`m.id = '${params.id}'`);
    }

    if (params.querySearch) {
      queryBuilder.andWhere(`m.name LIKE '%${params.querySearch}%'`);
    }
    // response
    return queryBuilder;
  }
}
