import { Repository } from 'typeorm';
import { UserMysqlSchema } from '../../schema/user-mysql.schema';
import { UserListParams } from 'src/modules/user/domain/user.params';

export class UserSelectMysqlQuery {
  constructor(private repository: Repository<UserMysqlSchema>) {}

  public query(params: UserListParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.role', 'r')
      .innerJoinAndSelect('u.worker', 'w');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`u.id = '${params.id}'`);
    }

    if (params.workerId) {
      queryBuilder.andWhere(`u.workerId = '${params.workerId}'`);
    }

    if (params.username) {
      queryBuilder.andWhere(`u.username = '${params.username}'`);
    }

    if (params.roleId) {
      queryBuilder.andWhere(`u.roleId = ${params.roleId}`);
    }

    if (typeof params.state != 'undefined') {
      queryBuilder.andWhere(`u.state = ${params.state}`);
    }

    // response
    return queryBuilder;
  }
}
