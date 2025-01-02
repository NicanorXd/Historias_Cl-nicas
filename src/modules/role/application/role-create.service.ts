import { RoleCreateParams } from '../domain/role.params';
import { RoleRepository } from '../domain/role.repository';
import { RoleValue } from '../domain/role.value';

export class RoleCreateService {
  constructor(private roleRepository: RoleRepository) {}

  async execute(params: RoleCreateParams) {
    const exists = await this.roleRepository.findRole({
      description: params.description,
    });
    // validar role
    if (exists) {
      throw new Error('El rol ya existe!!!');
    }
    // response
    const value = new RoleValue(params);
    return this.roleRepository.createRole(value);
  }
}
