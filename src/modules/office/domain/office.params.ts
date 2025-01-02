export interface OfficeFindParams {
  id?: number;
  attentionId?: number;
  historyNumber?: string;
  documentNumber?: string;
  workerId?: number;
  patientId?: number;
}

export interface OfficePaginateParams extends OfficeFindParams {
  page: number;
  limit: number;
}

export interface OfficeCreateParams {
  attentionId: number;
  preferential?: string;
  workspace?: string;
  nextAppointment?: string;
  anamnesis?: OfficeCreateAnamnesisParams;
  diagnosis?: OfficeCreateDiagnosisDetailParams[];
  tratamientos?: OfficeCreateTratamientoParams[];
}

export interface OfficeEditParams {
  preferential?: string;
  workspace?: string;
  nextAppointment?: string;
  anamnesis?: OfficeCreateAnamnesisParams;
  diagnosis?: OfficeCreateDiagnosisDetailParams[];
  tratamientos?: OfficeCreateTratamientoParams[];
}

export interface OfficeCreateAnamnesisParams {
  timeSick: string;
  reason: string;
  illnessStory: string;
  biological: string;
  background: string;
}

export interface OfficeCreateDiagnosisDetailParams {
  diagnosisId: number;
  comment: string;
  morbilidad: string;
}

export interface OfficeCreateTratamientoParams {
  description: string;
  medicamento: string;
  presentationId: number;
  dosis: string;
  frequency: string;
  administrationId: number;
  duration: string;
}
