import { createZodDto } from '@anatine/zod-nestjs';
import { RoleListParams } from 'src/modules/role/domain/role.params';
import zod from 'zod';

const schema = zod.object({
  querySearch: zod.string().optional(),
});

export class RoleListDto
  extends createZodDto(schema)
  implements RoleListParams
{
  querySearch?: string;
}
