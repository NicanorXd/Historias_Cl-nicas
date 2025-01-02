import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { PatientPaginateParams } from 'src/modules/patient/domain/patient.params';
import zod from 'zod';

const schema = zod.object({
  page: zod.number(),
  limit: zod.number(),
  querySearch: zod.string().optional(),
  documentNumber: zod.string().optional(),
});

export class PatientPaginateDto
  extends createZodDto(schema)
  implements PatientPaginateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;
}
