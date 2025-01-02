import { Repository } from 'typeorm';
import { AdministrationMysqlSchema } from '../../schema/administration-mysql.schema';

export class AdministrationSelectMysqlQuery {
  constructor(private repository: Repository<AdministrationMysqlSchema>) {}

  public query() {
    const queryBuilder = this.repository.createQueryBuilder('a');
    // response
    return queryBuilder;
  }
}
