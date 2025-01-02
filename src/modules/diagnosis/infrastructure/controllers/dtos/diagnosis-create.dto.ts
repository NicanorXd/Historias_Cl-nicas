import { createZodDto } from '@anatine/zod-nestjs';
import { DiagnosisCreateParams } from 'src/modules/diagnosis/domain/diagnosis.params';
import zod from 'zod';

const schema = zod.object({
  cie10: zod.string(),
  description: zod.string(),
});

export class DiagnosisCreateDto
  extends createZodDto(schema)
  implements DiagnosisCreateParams
{
  cie10: string;
  description: string;
}
