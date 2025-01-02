import { createZodDto } from '@anatine/zod-nestjs';
import { ServiceCreateParams } from 'src/modules/service/domain/service.params';
import zod from 'zod';

const schema = zod.object({
  description: zod.string(),
});

export class ServiceCreateDto
  extends createZodDto(schema)
  implements ServiceCreateParams
{
  description: string;
}
