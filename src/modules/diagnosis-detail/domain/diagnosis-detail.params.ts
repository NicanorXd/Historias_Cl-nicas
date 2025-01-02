export interface DiagnosisDetailFindParams {
  officeId?: number;
}

export class DiagnosisDetailCreateParams {
  officeId: number;
  diagnosisId: number;
  comment: string;
  morbilidad: string;
}
