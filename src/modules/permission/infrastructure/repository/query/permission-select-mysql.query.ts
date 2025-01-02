import { Repository } from 'typeorm';
import { PermissionMysqlSchema } from '../../schema/permission-mysql.schema';
import { PermissionListParams } from 'src/modules/permission/domain/permission.params';

export class PermissionSelectMysqlQuery {
  constructor(private repository: Repository<PermissionMysqlSchema>) {}

  public query(params: PermissionListParams) {
    const queryBuilder = this.repository.createQueryBuilder('p');
    // filters
    if (params.roleId) {
      queryBuilder.andWhere(`p.roleId = '${params.roleId}'`);
    }
    // response
    return queryBuilder;
  }
}
