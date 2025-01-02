import { UserEntity } from 'src/modules/user/domain/user.entity';
import { AuthEntity } from '../domain/auth.entity';
import { AuthRepository } from '../domain/auth.repository';

export class AuthIdentifyService {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: AuthEntity): Promise<UserEntity> {
    return this.authRepository.identify(request);
  }
}
