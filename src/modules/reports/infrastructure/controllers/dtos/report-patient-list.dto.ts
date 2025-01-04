import { createZodDto } from '@anatine/zod-nestjs';
import { PatientGenderEnum } from 'src/modules/patient/domain/patient.enum';
import { PatientReportParams } from 'src/modules/patient/domain/patient.params';
import zod from 'zod';

const schema = zod.object({
  dateStart: zod.string(),
  dateOver: zod.string(),
  gender: zod.optional(zod.nativeEnum(PatientGenderEnum)),
});

export class ReportPatientListDto
  extends createZodDto(schema)
  implements PatientReportParams
{
  dateStart: string;
  dateOver: string;
  gender?: PatientGenderEnum;
}
