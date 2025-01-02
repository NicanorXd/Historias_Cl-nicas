import { Repository } from 'typeorm';
import { InsuredTypeMysqlSchema } from '../../schema/insured-type-mysql.schema';

export class InsuredTypeSelectMysqlQuery {
  constructor(private repository: Repository<InsuredTypeMysqlSchema>) {}

  public query() {
    const queryBuilder = this.repository.createQueryBuilder('i');
    // response
    return queryBuilder;
  }
}
