import { InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserValue } from '../domain/user.value';
import { UserCreateParams } from '../domain/user.params';

export class UserCreateService {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UserCreateParams) {
    const value = new UserValue(request);
    // validar existencia del usuario
    const exists = await this.userRepository.findUser({
      username: value.username,
    });
    if (exists) {
      throw new InternalServerErrorException('errors.userExists');
    }
    // create user
    return this.userRepository.createUser(value);
  }
}
