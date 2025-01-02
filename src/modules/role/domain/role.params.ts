export interface RoleFindParams {
  id?: number;
  description?: string;
}

export interface RoleListParams extends RoleFindParams {
  querySearch?: string;
}

export interface RoleCreateParams {
  description: string;
  icon: string;
}

export interface RoleEditParams {
  description?: string;
  icon?: string;
  state?: boolean;
}
