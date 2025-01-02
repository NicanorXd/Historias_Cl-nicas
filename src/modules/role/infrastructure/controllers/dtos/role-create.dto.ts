import { createZodDto } from '@anatine/zod-nestjs';
import { RoleCreateParams } from 'src/modules/role/domain/role.params';
import zod from 'zod';

const schema = zod.object({
  description: zod.string(),
  icon: zod.string(),
});

export class RoleCreateDto
  extends createZodDto(schema)
  implements RoleCreateParams
{
  description: string;
  icon: string;
}
