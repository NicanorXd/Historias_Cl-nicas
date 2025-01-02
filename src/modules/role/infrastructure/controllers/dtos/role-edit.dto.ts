import { createZodDto } from '@anatine/zod-nestjs';
import { RoleEditParams } from 'src/modules/role/domain/role.params';
import zod from 'zod';

const schema = zod.object({
  description: zod.string(),
  icon: zod.string(),
});

export class RoleEditDto
  extends createZodDto(schema)
  implements RoleEditParams
{
  description: string;
  icon: string;
}
