import { PatientGenderEnum } from 'src/modules/patient/domain/patient.enum';

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

export interface DiagnosisReportParams {
  dateStart: string;
  dateOver: string;
  gender?: PatientGenderEnum;
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
