export interface DiagnosisFindParams {
  id?: number;
  cie10?: string;
}

export interface DiagnosisListParams extends DiagnosisFindParams {
  querySearch?: string;
}

export interface DiagnosisPaginateParams extends DiagnosisListParams {
  page: number;
  limit: number;
}

export interface DiagnosisCreateParams {
  cie10: string;
  description: string;
}

export interface DiagnosisEditParams {
  cie10?: string;
  description?: string;
  state?: boolean;
}
