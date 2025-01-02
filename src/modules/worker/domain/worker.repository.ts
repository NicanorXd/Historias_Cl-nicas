import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { WorkerEntity } from './worker.entity';
import {
  WorkerPaginateParams,
  WorkerEditParams,
  WorkerFindParams,
  WorkerListParams,
} from './worker.params';
import { WorkerValue } from './worker.value';
import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';

export interface WorkerRepository extends PersistenceRepository {
  paginateWorkers(
    params: WorkerPaginateParams,
  ): Promise<PaginateEntity<WorkerEntity>>;
  listWorkers(params: WorkerListParams): Promise<WorkerEntity[]>;
  findWorker(parms: WorkerFindParams): Promise<WorkerEntity>;
  createWorker(value: WorkerValue): Promise<WorkerEntity>;
  editWorker(
    params: WorkerFindParams,
    payload: WorkerEditParams,
  ): Promise<boolean>;
  deleteWorker(parmas: WorkerFindParams): Promise<boolean>;
}
