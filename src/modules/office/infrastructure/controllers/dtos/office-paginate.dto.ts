import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { OfficePaginateParams } from 'src/modules/office/domain/office.params';
import zod from 'zod';

const schema = zod.object({
  page: zod.number(),
  limit: zod.number(),
  historyNumber: zod.optional(zod.string()),
  documentNumber: zod.optional(zod.string()),
  workerId: zod.optional(zod.number()),
  patientId: zod.optional(zod.number()),
});

export class OfficePaginateDto
  extends createZodDto(schema)
  implements OfficePaginateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;

  @Transform(({ value }) => (!!value ? parseInt(`${value}`) : undefined))
  workerId: number;

  @Transform(({ value }) => (!!value ? parseInt(`${value}`) : undefined))
  patientId: number;
}
