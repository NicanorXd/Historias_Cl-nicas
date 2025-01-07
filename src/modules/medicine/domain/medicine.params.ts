export interface MedicineFindParams {
  id?: number;
}

export interface MedicineListParams extends MedicineFindParams {
  querySearch?: string;
}

export interface MedicinePaginateParams extends MedicineListParams {
  page: number;
  limit: number;
}
