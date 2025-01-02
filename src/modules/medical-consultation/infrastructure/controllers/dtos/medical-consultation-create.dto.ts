import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { MedicalConsultationCreateParams } from 'src/modules/medical-consultation/domain/medical-consultation.params';
import zod from 'zod';

const schema = zod.object({
  patientId: zod.number(),
  serviceId: zod.number(),
  workerId: zod.number(),
  date: zod.string(),
});

export class MedicalConsultationCreateDto
  extends createZodDto(schema)
  implements MedicalConsultationCreateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  patientId: number;

  @Transform(({ value }) => parseInt(`${value}`))
  serviceId: number;

  @Transform(({ value }) => parseInt(`${value}`))
  workerId: number;

  date: string;
}
