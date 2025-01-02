import { UserEntity } from './user.entity';
import * as random from 'random-string-alphanumeric-generator';
import * as bcrypt from 'bcrypt';
import { UserCreateParams } from './user.params';
import { RoleEntity } from 'src/modules/role/domain/role.entity';

export class UserValue implements UserEntity {
  constructor(params: UserCreateParams) {
    this.id = random.randomAlphanumeric(10, 'uppercase');
    this.workerId = params.workerId;
    this.username = params.username;
    this.password = UserValue.hashPassword(params.password);
    this.roleId = params.roleId;
    this.state = true;
  }

  id: string;
  workerId: number;
  username: string;
  password: string;
  roleId: number;
  state: boolean;
  role: RoleEntity;

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }
}
