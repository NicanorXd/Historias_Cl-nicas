import { Repository } from 'typeorm';
import { RoleMysqlSchema } from '../../schema/role-mysql.schema';
import { RoleListParams } from 'src/modules/role/domain/role.params';

export class RoleSelectMysqlQuery {
  constructor(private repository: Repository<RoleMysqlSchema>) {}

  public query(params: RoleListParams) {
    const queryBuilder = this.repository.createQueryBuilder('r');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`r.id = '${params.id}'`);
    }

    if (params.description) {
      queryBuilder.andWhere(`r.description = '${params.description}'`);
    }

    if (params.querySearch) {
      queryBuilder.andWhere(`r.description LIKE '%${params.querySearch}%'`);
    }
    // response
    return queryBuilder;
  }
}
