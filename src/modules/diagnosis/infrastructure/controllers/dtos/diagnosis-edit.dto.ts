import { createZodDto } from '@anatine/zod-nestjs';
import { DiagnosisEditParams } from 'src/modules/diagnosis/domain/diagnosis.params';
import zod from 'zod';

const schema = zod.object({
  cie10: zod.string(),
  description: zod.string(),
});

export class DiagnosisEditDto
  extends createZodDto(schema)
  implements DiagnosisEditParams
{
  cie10: string;
  description: string;
}
