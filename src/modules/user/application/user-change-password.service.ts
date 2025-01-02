import { UserFindParams } from '../domain/user.params';
import { UserRepository } from '../domain/user.repository';
import * as bcrypt from 'bcrypt';
import { UserValue } from '../domain/user.value';

export class UserChangePasswordService {
  constructor(private userRepository: UserRepository) {}

  async execute(params: UserFindParams, payload: UserChangePasswordRequest) {
    const user = await this.userRepository.findUser(params);
    if (!user) throw new Error('errors.userNotFound');
    // validar password
    const isSame = bcrypt.compareSync(payload.password, user.password);
    if (!isSame) throw new Error('errors.userPasswordInvalid');
    // actualizar password
    const password = UserValue.hashPassword(payload.newPassword);
    return this.userRepository.editUser({ id: user.id }, { password });
  }
}

export interface UserChangePasswordRequest {
  password: string;
  newPassword: string;
}
