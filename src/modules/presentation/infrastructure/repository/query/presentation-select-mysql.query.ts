import { Repository } from 'typeorm';
import { PresentationMysqlSchema } from '../../schema/presentation-mysql.schema';

export class PresentationSelectMysqlQuery {
  constructor(private repository: Repository<PresentationMysqlSchema>) {}

  public query() {
    const queryBuilder = this.repository.createQueryBuilder('p');
    // response
    return queryBuilder;
  }
}
