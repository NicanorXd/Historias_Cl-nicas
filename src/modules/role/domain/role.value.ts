import { RoleEntity } from './role.entity';
import { RoleCreateParams } from './role.params';

export class RoleValue implements RoleEntity {
  constructor(params: RoleCreateParams) {
    this.description = params.description;
    this.icon = params.icon;
    this.state = true;
  }

  id: number;
  description: string;
  icon: string;
  state: boolean;
}
