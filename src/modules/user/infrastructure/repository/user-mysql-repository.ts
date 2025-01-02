import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from '../../domain/user.entity';
import {
  UserFindParams,
  UserEditParams,
  UserPaginateParams,
  UserListParams,
} from '../../domain/user.params';
import { userMysqlProviderName } from '../schema/user-persistence.provider';
import { DataSource, Repository } from 'typeorm';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { UserSelectMysqlQuery } from './query/user-select-mysql.query';
import { paginate } from 'nestjs-typeorm-paginate';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { UserMysqlSchema } from '../schema/user-mysql.schema';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';

@Injectable()
export class UserMysqlRepository
  extends PersistenceMysqlRepository
  implements UserRepository
{
  constructor(
    @Inject(userMysqlProviderName)
    private repository: Repository<UserMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  resetManager(): void {
    this.manager = this.repository.manager;
  }

  async paginateUsers(
    params: UserPaginateParams,
  ): Promise<PaginateEntity<UserEntity>> {
    const queryBuilder = new UserSelectMysqlQuery(this.repository).query(
      params,
    );
    return paginate(queryBuilder, {
      page: params.page,
      limit: params.limit,
    });
  }

  async findUser(params: UserFindParams): Promise<UserEntity> {
    const selected = new UserSelectMysqlQuery(this.repository);
    return selected.query(params).getOne();
  }

  async createUser(payload: UserEntity): Promise<UserEntity> {
    const repository = this.manager.getRepository(UserMysqlSchema);
    const data = repository.create(payload);
    return repository.save(data);
  }

  async editUser(
    params: UserFindParams,
    payload: UserEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(UserMysqlSchema);
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deleteUser(params: UserFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(UserMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }

  async listUserIds(params: UserListParams): Promise<string[]> {
    const queryBuilder = new UserSelectMysqlQuery(this.repository)
      .query(params)
      .select(`u.id`);
    const result = await queryBuilder.getMany();
    return result.map((item) => item.id);
  }

  async countUsers(params: UserListParams): Promise<number> {
    const queryBuilder = new UserSelectMysqlQuery(this.repository)
      .query(params)
      .select(`COUNT(u.id) as total`);
    const { total } = await queryBuilder.getRawOne();
    return parseInt(total);
  }
}
