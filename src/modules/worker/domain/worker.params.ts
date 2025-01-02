import { WorkerGenderEnum } from './worker.enum';

export interface WorkerFindParams {
  id?: number;
  documentNumber?: string;
}

export interface WorkerListParams extends WorkerFindParams {
  querySearch?: string;
}

export interface WorkerPaginateParams extends WorkerListParams {
  page: number;
  limit: number;
}

export interface WorkerCreateParams {
  name: string;
  lastname: string;
  documentNumber: string;
  dateOfBirth: string;
  gender: WorkerGenderEnum;
  email: string;
  phone: string;
  ubigeoBirth: string;
  addressCurrent: string;
  professionId: number;
  tuitionNumber: string;
}

export interface WorkerEditParams {
  name?: string;
  lastname?: string;
  documentNumber?: string;
  dateOfBirth?: string;
  gender?: WorkerGenderEnum;
  email?: string;
  phone?: string;
  ubigeoBirth?: string;
  addressCurrent?: string;
  professionId?: number;
  tuitionNumber?: string;
  state?: boolean;
}
