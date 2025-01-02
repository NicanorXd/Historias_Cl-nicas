import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { AttentionPaginateParams } from 'src/modules/attention/domain/attention.params';
import zod from 'zod';

const schema = zod.object({
  page: zod.number(),
  limit: zod.number(),
  hasOffice: zod.optional(zod.boolean()),
  state: zod.optional(zod.boolean()),
  workerId: zod.optional(zod.number()),
  serviceId: zod.optional(zod.number()),
});

export class AttentionPaginateDto
  extends createZodDto(schema)
  implements AttentionPaginateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;

  @Transform(({ value }) => (!!value ? JSON.parse(`${value}`) : undefined))
  hasOffice: boolean;

  @Transform(({ value }) => (!!value ? JSON.parse(`${value}`) : undefined))
  state: boolean;

  @Transform(({ value }) => (!!value ? parseInt(`${value}`) : undefined))
  workerId: number;

  @Transform(({ value }) => (!!value ? parseInt(`${value}`) : undefined))
  serviceId: number;
}
