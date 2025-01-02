import { Inject, Injectable } from '@nestjs/common';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { DataSource, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { AttentionSelectMysqlQuery } from './query/attention-select-mysql.query';
import { AttentionRepository } from '../../domain/attention.repository';
import { attentionMysqlProviderName } from '../schema/attention-persistence.provider';
import { AttentionMysqlSchema } from '../schema/attention-mysql.schema';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { AttentionEntity } from '../../domain/attention.entity';
import {
  AttentionPaginateParams,
  AttentionFindParams,
  AttentionEditParams,
} from '../../domain/attention.params';
import { AttentionValue } from '../../domain/attention.value';

@Injectable()
export class AttentionMysqlRepository
  extends PersistenceMysqlRepository
  implements AttentionRepository
{
  constructor(
    @Inject(attentionMysqlProviderName)
    private repository: Repository<AttentionMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async paginateAttentions(
    params: AttentionPaginateParams,
  ): Promise<PaginateEntity<AttentionEntity>> {
    const repository = this.manager.getRepository(AttentionMysqlSchema);
    const queryBuilder = new AttentionSelectMysqlQuery(repository).query(
      params,
    );
    return paginate(queryBuilder, { page: params.page, limit: params.limit });
  }

  async findAttention(params: AttentionFindParams): Promise<AttentionEntity> {
    const repository = this.manager.getRepository(AttentionMysqlSchema);
    const queryBuilder = new AttentionSelectMysqlQuery(repository).query(
      params,
    );
    return queryBuilder.getOne();
  }

  async createAttention(value: AttentionValue): Promise<AttentionEntity> {
    const repository = this.manager.getRepository(AttentionMysqlSchema);
    const payload = this.repository.create(value);
    return repository.save(payload);
  }

  async editAttention(
    params: AttentionFindParams,
    payload: AttentionEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(AttentionMysqlSchema);
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deleteAttention(params: AttentionFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(AttentionMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
