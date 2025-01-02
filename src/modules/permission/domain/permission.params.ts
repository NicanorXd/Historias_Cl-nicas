import { PermissionActionEnum } from './permission.enum';

export interface PermissionFindParams {
  roleId?: number;
}

export interface PermissionListParams extends PermissionFindParams {}

export interface PermissionCreateParams {
  roleId: number;
  action: PermissionActionEnum;
}
