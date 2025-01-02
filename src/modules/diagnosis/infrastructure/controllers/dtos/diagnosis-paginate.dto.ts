import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { DiagnosisPaginateParams } from 'src/modules/diagnosis/domain/diagnosis.params';
import zod from 'zod';

const schema = zod.object({
  cie10: zod.string().optional(),
  querySearch: zod.string().optional(),
  page: zod.number(),
  limit: zod.number(),
});

export class DiagnosisPaginateDto
  extends createZodDto(schema)
  implements DiagnosisPaginateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  page: number;

  @Transform(({ value }) => parseInt(`${value}`))
  limit: number;
}
