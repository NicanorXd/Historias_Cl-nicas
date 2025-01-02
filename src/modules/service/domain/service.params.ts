export interface ServiceFindParams {
  id?: number;
  description?: string;
}

export interface ServiceListParams extends ServiceFindParams {
  querySearch?: string;
}

export interface ServicePaginateParams extends ServiceListParams {
  page: number;
  limit: number;
}

export interface ServiceCreateParams {
  description: string;
}

export interface ServiceEditParams {
  description?: string;
  state?: boolean;
}
