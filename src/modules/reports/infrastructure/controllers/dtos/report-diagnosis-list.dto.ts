import { createZodDto } from '@anatine/zod-nestjs';
import { DiagnosisReportParams } from 'src/modules/diagnosis/domain/diagnosis.params';
import { PatientGenderEnum } from 'src/modules/patient/domain/patient.enum';
import zod from 'zod';

const schema = zod.object({
  dateStart: zod.string(),
  dateOver: zod.string(),
  gender: zod.optional(zod.nativeEnum(PatientGenderEnum)),
});

export class ReportDiagnosisListDto
  extends createZodDto(schema)
  implements DiagnosisReportParams
{
  dateStart: string;
  dateOver: string;
  gender?: PatientGenderEnum;
}
