import { RoleEntity } from './role.entity';
import { RoleCreateParams } from './role.params';

export class RoleValue implements RoleEntity {
  constructor(params: RoleCreateParams) {
    this.description = params.description;
    this.icon = params.icon;
    this.isRoot = false;
    this.state = true;
  }

  id: number;
  description: string;
  icon: string;
  isRoot: boolean;
  state: boolean;
}
