export interface AttentionFindParams {
  id?: number;
  state?: boolean;
  workerId?: number;
  serviceId?: number;
}

export interface AttentionListParams extends AttentionFindParams {
  hasOffice?: boolean;
}

export interface AttentionPaginateParams extends AttentionListParams {
  page: number;
  limit: number;
}

export interface AttentionCreateParams {
  medicalConsultationId: number;
  mmhg: string;
  weigth: string;
  temperature: string;
  talle: string;
  fc: string;
  imc: string;
  generalCondition: string;
}

export interface AttentionEditParams {
  medicalConsultationId?: number;
  mmhg?: string;
  weigth?: string;
  temperature?: string;
  talle?: string;
  fc?: string;
  imc?: string;
  generalCondition?: string;
  state?: boolean;
}
