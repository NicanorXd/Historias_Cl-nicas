import { DiagnosisEntity } from './diagnosis.entity';
import { DiagnosisCreateParams } from './diagnosis.params';

export class DiagnosisValue implements DiagnosisEntity {
  constructor(params: DiagnosisCreateParams) {
    this.cie10 = params.cie10;
    this.description = params.description;
    this.state = true;
  }

  id: number;
  cie10: string;
  description: string;
  state: boolean;
}
