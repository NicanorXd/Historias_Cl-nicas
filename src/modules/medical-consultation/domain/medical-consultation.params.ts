export interface MedicalConsultationFindParams {
  id?: number;
  workerId?: number;
  state?: boolean;
}

export interface MedicalConsultationPaginateParams
  extends MedicalConsultationFindParams {
  page: number;
  limit: number;
}

export interface MedicalConsultationCreateParams {
  patientId: number;
  serviceId: number;
  workerId: number;
  date: string;
}

export interface MedicalConsultationEditParams {
  patientId?: number;
  serviceId?: number;
  workerId?: number;
  date?: string;
  state?: boolean;
}
