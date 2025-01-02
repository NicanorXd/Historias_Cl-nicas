import { UserEditParams, UserFindParams } from '../domain/user.params';
import { UserRepository } from '../domain/user.repository';
import { UserValue } from '../domain/user.value';

export class UserEditService {
  constructor(private userRepository: UserRepository) {}

  async execute(params: UserFindParams, payload: UserEditParams) {
    const user = await this.userRepository.findUser(params);
    if (!user) throw new Error('errors.userNotFound');
    // validar modify password
    if (!!payload.password && payload.password !== user.password) {
      payload.password = UserValue.hashPassword(payload.password);
    }
    // response
    return this.userRepository.editUser(params, payload);
  }
}
