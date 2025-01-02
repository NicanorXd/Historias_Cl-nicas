import { NotFoundException } from '@nestjs/common';
import { RoleFindParams } from '../domain/role.params';
import { RoleRepository } from '../domain/role.repository';
import { PermissionRepository } from 'src/modules/permission/domain/permission.repository';

export class RolePermissionListService {
  constructor(
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository,
  ) {}

  async execute(params: RoleFindParams) {
    const role = await this.roleRepository.findRole(params);
    if (!role) throw new NotFoundException('No se encontró el registro');
    return this.permissionRepository.listPermissions({ roleId: role.id });
  }
}
