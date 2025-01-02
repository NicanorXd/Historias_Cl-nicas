import { Repository } from 'typeorm';
import { ProfessionMysqlSchema } from '../../schema/profession-mysql.schema';

export class ProfessionSelectMysqlQuery {
  constructor(private repository: Repository<ProfessionMysqlSchema>) {}

  public query() {
    const queryBuilder = this.repository.createQueryBuilder('p');
    // response
    return queryBuilder;
  }
}
