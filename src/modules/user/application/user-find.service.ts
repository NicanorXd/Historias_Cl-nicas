import { UserFindParams } from '../domain/user.params';
import { UserRepository } from '../domain/user.repository';

export class UserFindService {
  constructor(private userRepository: UserRepository) {}

  async execute(params: UserFindParams) {
    const user = await this.userRepository.findUser(params);
    if (!user) throw new Error('errors.userNotFound');
    return user;
  }
}
