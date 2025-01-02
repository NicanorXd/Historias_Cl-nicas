import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { WorkerPaginateParams } from 'src/modules/worker/domain/worker.params';
import zod from 'zod';

const schema = zod.object({
  documentNumber: zod.string().optional(),
  querySearch: zod.string().optional(),
  page: zod.number(),
  limit: zod.number(),
});

export class WorkerPaginateDto
  extends createZodDto(schema)
  implements WorkerPaginateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;
}
