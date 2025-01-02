import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import {
  AttentionEditParams,
  AttentionFindParams,
  AttentionPaginateParams,
} from './attention.params';
import { AttentionEntity } from './attention.entity';
import { AttentionValue } from './attention.value';

export interface AttentionRepository {
  paginateAttentions(
    params: AttentionPaginateParams,
  ): Promise<PaginateEntity<AttentionEntity>>;
  findAttention(parmas: AttentionFindParams): Promise<AttentionEntity>;
  createAttention(value: AttentionValue): Promise<AttentionEntity>;
  editAttention(
    params: AttentionFindParams,
    payload: AttentionEditParams,
  ): Promise<boolean>;
  deleteAttention(params: AttentionFindParams): Promise<boolean>;
}
