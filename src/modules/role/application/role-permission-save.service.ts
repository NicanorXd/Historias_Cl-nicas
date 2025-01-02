import { NotFoundException } from '@nestjs/common';
import { RoleFindParams } from '../domain/role.params';
import { RoleRepository } from '../domain/role.repository';
import { PermissionRepository } from 'src/modules/permission/domain/permission.repository';
import { PermissionActionEnum } from 'src/modules/permission/domain/permission.enum';
import { PermissionValue } from 'src/modules/permission/domain/permission.value';

export class RolePermissionSaveService {
  constructor(
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository,
  ) {}

  async execute(params: RoleFindParams, payload: PermissionActionEnum[]) {
    const role = await this.roleRepository.findRole(params);
    if (!role) throw new NotFoundException('No se encontró el registro');
    // eliminar
    await this.permissionRepository.deletePermission({ roleId: role.id });
    // save
    for (const item of payload) {
      const value = new PermissionValue({
        roleId: role.id,
        action: item,
      });
      await this.permissionRepository.createPermission(value);
    }
    // response
    return true;
  }
}
