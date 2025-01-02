import { PermissionEntity } from 'src/modules/permission/domain/permission.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';

export interface AuthProfileInterface {
  auth: UserEntity;
  permissions: PermissionEntity[];
}
