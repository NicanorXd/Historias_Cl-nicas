import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { RoleEntity } from './role.entity';
import { RoleEditParams, RoleFindParams, RoleListParams } from './role.params';
import { RoleValue } from './role.value';

export interface RoleRepository extends PersistenceRepository {
  listRole(params: RoleListParams): Promise<RoleEntity[]>;
  findRole(params: RoleFindParams): Promise<RoleEntity>;
  createRole(value: RoleValue): Promise<RoleEntity>;
  editRole(params: RoleFindParams, payload: RoleEditParams): Promise<boolean>;
  deleteRole(params: RoleFindParams): Promise<boolean>;
}
