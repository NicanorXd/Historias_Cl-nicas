import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { PatientGenderEnum } from 'src/modules/patient/domain/patient.enum';
import { PatientEditParams } from 'src/modules/patient/domain/patient.params';
import zod from 'zod';

const schema = zod.object({
  name: zod.string(),
  lastname: zod.string(),
  documentNumber: zod.string(),
  dateOfBirth: zod.string(),
  ubigeoBirth: zod.string(),
  gender: zod.nativeEnum(PatientGenderEnum),
  email: zod.string().email().nullable().optional(),
  phone: zod.string().nullable().optional(),
  insuredTypeId: zod.number(),
  ubigeoCurrent: zod.string(),
  addressCurrent: zod.string(),
  state: zod.boolean(),
});

export class PatientEditDto
  extends createZodDto(schema)
  implements PatientEditParams
{
  name?: string;
  lastname?: string;
  documentNumber?: string;
  dateOfBirth?: string;
  ubigeoBirth?: string;
  gender: PatientGenderEnum;
  email?: string;
  phone?: string;

  @Transform(({ value }) => parseInt(`${value}`))
  insuredTypeId: number;

  ubigeoCurrent?: string;
  addressCurrent?: string;
  state?: boolean;
}
