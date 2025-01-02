import { PermissionEntity } from './permission.entity';
import { PermissionActionEnum } from './permission.enum';
import { PermissionCreateParams } from './permission.params';
import { v4 as uuid4 } from 'uuid';

export class PermissionValue implements PermissionEntity {
  id: string;
  roleId: number;
  action: PermissionActionEnum;

  constructor(params: PermissionCreateParams) {
    this.id = uuid4();
    this.roleId = params.roleId;
    this.action = params.action;
  }
}
