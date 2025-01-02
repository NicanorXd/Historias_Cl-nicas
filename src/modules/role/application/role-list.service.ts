import { RoleListParams } from '../domain/role.params';
import { RoleRepository } from '../domain/role.repository';

export class RoleListService {
  constructor(private roleRepository: RoleRepository) {}

  async execute(params: RoleListParams) {
    return this.roleRepository.listRole(params);
  }
}
