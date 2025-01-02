import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { UserEntity } from './user.entity';
import {
  UserEditParams,
  UserFindParams,
  UserListParams,
  UserPaginateParams,
} from './user.params';
import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';

export interface UserRepository extends PersistenceRepository {
  findUser(params: UserFindParams): Promise<UserEntity>;
  paginateUsers(
    params: UserPaginateParams,
  ): Promise<PaginateEntity<UserEntity>>;
  createUser(payload: UserEntity): Promise<UserEntity>;
  editUser(params: UserFindParams, payload: UserEditParams): Promise<boolean>;
  deleteUser(params: UserFindParams): Promise<boolean>;
  listUserIds(params: UserListParams): Promise<string[]>;
  countUsers(params: UserListParams): Promise<number>;
}
