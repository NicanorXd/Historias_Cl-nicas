import { Repository } from 'typeorm';
import { ServiceMysqlSchema } from '../../schema/service-mysql.schema';
import { ServiceListParams } from 'src/modules/service/domain/service.params';

export class ServiceSelectMysqlQuery {
  constructor(private repository: Repository<ServiceMysqlSchema>) {}

  public query(params: ServiceListParams) {
    const queryBuilder = this.repository.createQueryBuilder('s');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`s.id = '${params.id}'`);
    }

    if (params.description) {
      queryBuilder.andWhere(`s.description = '${params.description}'`);
    }

    if (params.querySearch) {
      queryBuilder.andWhere(`s.description LIKE '%${params.querySearch}%'`);
    }
    // response
    return queryBuilder;
  }
}
