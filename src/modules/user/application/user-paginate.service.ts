import { UserPaginateParams } from '../domain/user.params';
import { UserRepository } from '../domain/user.repository';

export class UserPaginteService {
  constructor(private userRepository: UserRepository) {}

  async execute(params: UserPaginateParams) {
    return this.userRepository.paginateUsers(params);
  }
}
