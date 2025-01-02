import { createZodDto } from '@anatine/zod-nestjs';
import { PermissionActionEnum } from 'src/modules/permission/domain/permission.enum';
import zod from 'zod';

const schema = zod.object({
  permissions: zod.array(zod.nativeEnum(PermissionActionEnum)),
});

export class RolePermissionSaveDto extends createZodDto(schema) {
  permissions: PermissionActionEnum[];
}
