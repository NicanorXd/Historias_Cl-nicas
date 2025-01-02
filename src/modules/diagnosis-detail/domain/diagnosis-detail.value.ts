import { DiagnosisDetailEntity } from './diagnosis-detail.entity';
import { DiagnosisDetailCreateParams } from './diagnosis-detail.params';

export class DiagnosisDetailValue implements DiagnosisDetailEntity {
  id: number;
  officeId: number;
  diagnosisId: number;
  comment: string;
  morbilidad: string;

  constructor(params: DiagnosisDetailCreateParams) {
    this.officeId = params.officeId;
    this.diagnosisId = params.diagnosisId;
    this.comment = params.comment;
    this.morbilidad = params.morbilidad;
  }
}
