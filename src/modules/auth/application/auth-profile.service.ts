import { PermissionRepository } from 'src/modules/permission/domain/permission.repository';
import { AuthEntity } from '../domain/auth.entity';
import { AuthRepository } from '../domain/auth.repository';
import { AuthProfileInterface } from '../domain/interfaces/auth-profile.interface';
import { UnauthorizedException } from '@nestjs/common';

export class AuthProfileService {
  constructor(
    private authRepository: AuthRepository,
    private permissionRepository: PermissionRepository,
  ) {}

  async execute(request: AuthEntity): Promise<AuthProfileInterface> {
    const auth = await this.authRepository.identify(request);
    if (!auth) throw new UnauthorizedException('No se encontró el perfil');
    const permissions = await this.permissionRepository.listPermissions({
      roleId: auth.roleId,
    });
    return { auth, permissions };
  }
}
