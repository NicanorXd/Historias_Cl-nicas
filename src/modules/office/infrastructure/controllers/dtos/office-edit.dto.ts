import { createZodDto } from '@anatine/zod-nestjs';
import {
  OfficeCreateAnamnesisParams,
  OfficeCreateDiagnosisDetailParams,
  OfficeCreateTratamientoParams,
  OfficeEditParams,
} from 'src/modules/office/domain/office.params';
import zod from 'zod';

const schema = zod.object({
  preferential: zod.string().optional(),
  workspace: zod.string().optional(),
  nextAppointment: zod.string().optional(),
  anamnesis: zod
    .object({
      timeSick: zod.string(),
      reason: zod.string(),
      illnessStory: zod.string(),
      biological: zod.string(),
      background: zod.string(),
    })
    .optional(),
  diagnosis: zod
    .array(
      zod.object({
        diagnosisId: zod.number(),
        comment: zod.string(),
        morbilidad: zod.string(),
      }),
    )
    .optional(),
  tratamientos: zod
    .array(
      zod.object({
        description: zod.string(),
        medicamento: zod.string(),
        presentationId: zod.number(),
        dosis: zod.string(),
        frequency: zod.string(),
        administrationId: zod.number(),
        duration: zod.string(),
      }),
    )
    .optional(),
});

export class OfficeEditDto
  extends createZodDto(schema)
  implements OfficeEditParams
{
  preferential?: string;
  workspace?: string;
  nextAppointment?: string;
  anamnesis?: OfficeCreateAnamnesisParams;
  diagnosis?: OfficeCreateDiagnosisDetailParams[];
  tratamientos?: OfficeCreateTratamientoParams[];
}
