import { PatientGenderEnum } from './patient.enum';

export interface PatientFindParams {
  id?: number;
  documentNumber?: string;
  historyNumber?: string;
}

export interface PatientListParams extends PatientFindParams {
  querySearch?: string;
}

export interface PatientPaginateParams extends PatientListParams {
  page: number;
  limit: number;
}

export interface PatientCreateParams {
  name: string;
  lastname: string;
  documentNumber: string;
  dateOfBirth: string;
  ubigeoBirth: string;
  gender: PatientGenderEnum;
  email?: string;
  phone?: string;
  insuredTypeId: number;
  ubigeoCurrent: string;
  addressCurrent: string;
}

export interface PatientEditParams {
  name?: string;
  lastname?: string;
  documentNumber?: string;
  dateOfBirth?: string;
  ubigeoBirth?: string;
  gender: PatientGenderEnum;
  email?: string;
  phone?: string;
  insuredTypeId?: number;
  ubigeoCurrent?: string;
  addressCurrent?: string;
  historyNumber?: string;
  state?: boolean;
}
