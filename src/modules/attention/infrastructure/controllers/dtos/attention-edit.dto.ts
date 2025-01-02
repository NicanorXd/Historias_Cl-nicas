import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { AttentionCreateParams } from 'src/modules/attention/domain/attention.params';
import zod from 'zod';

const schema = zod.object({
  medicalConsultationId: zod.number(),
  mmhg: zod.string(),
  weigth: zod.string(),
  temperature: zod.string(),
  talle: zod.string(),
  fc: zod.string(),
  imc: zod.string(),
  generalCondition: zod.string(),
});

export class AttentionEditDto
  extends createZodDto(schema)
  implements AttentionCreateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  medicalConsultationId: number;

  @Transform(({ value }) => `${value}`)
  mmhg: string;

  @Transform(({ value }) => `${value}`)
  weigth: string;

  @Transform(({ value }) => `${value}`)
  temperature: string;

  @Transform(({ value }) => `${value}`)
  talle: string;

  @Transform(({ value }) => `${value}`)
  fc: string;

  @Transform(({ value }) => `${value}`)
  imc: string;

  @Transform(({ value }) => `${value}`)
  generalCondition: string;
}
