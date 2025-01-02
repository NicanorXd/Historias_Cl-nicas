import { PermissionActionEnum } from './permission.enum';

export interface PermissionEntity {
  id: string;
  roleId: number;
  action: PermissionActionEnum;
}
