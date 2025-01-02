import { PermissionEntity } from './permission.entity';
import {
  PermissionFindParams,
  PermissionListParams,
} from './permission.params';
import { PermissionValue } from './permission.value';

export interface PermissionRepository {
  findPermission(params: PermissionFindParams): Promise<PermissionEntity>;
  listPermissions(params: PermissionListParams): Promise<PermissionEntity[]>;
  createPermission(value: PermissionValue): Promise<PermissionEntity>;
  deletePermission(params: PermissionFindParams): Promise<boolean>;
}
