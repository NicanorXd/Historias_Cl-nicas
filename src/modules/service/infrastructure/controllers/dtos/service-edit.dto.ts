import { createZodDto } from '@anatine/zod-nestjs';
import { ServiceEditParams } from 'src/modules/service/domain/service.params';
import zod from 'zod';

const schema = zod.object({
  description: zod.string(),
  state: zod.boolean(),
});

export class ServiceEditDto
  extends createZodDto(schema)
  implements ServiceEditParams
{
  description: string;
}
