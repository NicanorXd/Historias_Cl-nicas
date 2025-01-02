import { AuthRepository } from '../domain/auth.repository';
import { AuthValidateUser } from '../domain/auth.params';

export class AuthLoginService {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: AuthValidateUser): Promise<string> {
    const user = await this.authRepository.validateUser(params);
    return this.authRepository.login(user);
  }
}
