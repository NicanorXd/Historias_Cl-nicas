import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { MedicalConsultationPaginateParams } from 'src/modules/medical-consultation/domain/medical-consultation.params';
import zod from 'zod';

const schema = zod.object({
  page: zod.number(),
  limit: zod.number(),
  workerId: zod.optional(zod.number()),
  state: zod.optional(zod.boolean()),
});

export class MedicalConsultationPaginateDto
  extends createZodDto(schema)
  implements MedicalConsultationPaginateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;

  @Transform(({ value }) => (!!value ? parseInt(`${value}`) : undefined))
  workerId?: number;

  @Transform(({ value }) => (!!value ? JSON.parse(`${value}`) : undefined))
  state: boolean;
}
