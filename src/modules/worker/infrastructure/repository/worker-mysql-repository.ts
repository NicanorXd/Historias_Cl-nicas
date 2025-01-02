import { Inject, Injectable } from '@nestjs/common';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { DataSource, Repository } from 'typeorm';
import { workerMysqlProviderName } from '../schema/worker-persistence.provider';
import { WorkerMysqlSchema } from '../schema/worker-mysql.schema';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { WorkerRepository } from '../../domain/worker.repository';
import {
  WorkerEditParams,
  WorkerFindParams,
  WorkerListParams,
  WorkerPaginateParams,
} from '../../domain/worker.params';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { WorkerEntity } from '../../domain/worker.entity';
import { WorkerValue } from '../../domain/worker.value';
import { WorkerSelectMysqlQuery } from './query/worker-select-mysql.query';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class WorkerMysqlRepository
  extends PersistenceMysqlRepository
  implements WorkerRepository
{
  constructor(
    @Inject(workerMysqlProviderName)
    private repository: Repository<WorkerMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async paginateWorkers(
    params: WorkerPaginateParams,
  ): Promise<PaginateEntity<WorkerEntity>> {
    const repository = this.manager.getRepository(WorkerMysqlSchema);
    const queryBuilder = new WorkerSelectMysqlQuery(repository).query(params);
    return paginate(queryBuilder, { page: params.page, limit: params.limit });
  }

  async listWorkers(params: WorkerListParams): Promise<WorkerEntity[]> {
    const repository = this.manager.getRepository(WorkerMysqlSchema);
    return new WorkerSelectMysqlQuery(repository).query(params).getMany();
  }

  async findWorker(params: WorkerFindParams): Promise<WorkerEntity> {
    const repository = this.manager.getRepository(WorkerMysqlSchema);
    return new WorkerSelectMysqlQuery(repository).query(params).getOne();
  }

  async createWorker(value: WorkerValue): Promise<WorkerEntity> {
    const repository = this.manager.getRepository(WorkerMysqlSchema);
    const payload = this.repository.create(value);
    return repository.save(payload);
  }

  async editWorker(
    params: WorkerFindParams,
    payload: WorkerEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(WorkerMysqlSchema);
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deleteWorker(params: WorkerFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(WorkerMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
