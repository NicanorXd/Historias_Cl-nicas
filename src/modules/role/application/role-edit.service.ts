import { RoleEditParams, RoleFindParams } from '../domain/role.params';
import { RoleRepository } from '../domain/role.repository';

export class RoleEditService {
  constructor(private roleRepository: RoleRepository) {}

  async execute(params: RoleFindParams, payload: RoleEditParams) {
    const role = await this.roleRepository.findRole(params);
    if (!role) throw new Error('El registro no existe!!!');
    return this.roleRepository.editRole({ id: role.id }, payload);
  }
}
