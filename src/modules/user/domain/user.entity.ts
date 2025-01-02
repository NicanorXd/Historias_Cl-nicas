import { RoleEntity } from 'src/modules/role/domain/role.entity';

export interface UserEntity {
  id: string;
  workerId: number;
  username: string;
  password: string;
  roleId: number;
  state: boolean;

  role: RoleEntity;
}
