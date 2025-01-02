import { RoleFindParams } from '../domain/role.params';
import { RoleRepository } from '../domain/role.repository';

export class RoleDeleteService {
  constructor(private roleRepository: RoleRepository) {}

  async execute(params: RoleFindParams) {
    const role = await this.roleRepository.findRole(params);
    if (!role) throw new Error('El registro no existe');
    return this.roleRepository.deleteRole({ id: role.id });
  }
}
