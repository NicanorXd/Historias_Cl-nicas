import { RoleFindParams } from '../domain/role.params';
import { RoleRepository } from '../domain/role.repository';

export class RoleFindService {
  constructor(private roleRepository: RoleRepository) {}

  async execute(params: RoleFindParams) {
    return this.roleRepository.findRole(params);
  }
}
