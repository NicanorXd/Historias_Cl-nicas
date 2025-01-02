export interface UserFindParams {
  id?: string;
  username?: string;
  workerId?: number;
  roleId?: number;
  state?: boolean;
}

export interface UserListParams extends UserFindParams {
  querySearch?: string;
}

export interface UserPaginateParams extends UserListParams {
  page: number;
  limit: number;
}

export interface UserCreateParams {
  workerId: number;
  roleId: number;
  username: string;
  password: string;
}

export interface UserEditParams {
  workerId?: number;
  roleId?: number;
  username?: string;
  password?: string;
  state?: boolean;
}
