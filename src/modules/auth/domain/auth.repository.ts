import { UserEntity } from 'src/modules/user/domain/user.entity';
import { AuthValidateUser } from './auth.params';
import { AuthEntity } from './auth.entity';

export interface AuthRepository {
  validateUser(params: AuthValidateUser): Promise<UserEntity>;
  login(user: UserEntity): Promise<string>;
  identify(request: AuthEntity): Promise<UserEntity>;
}
