import { WorkerPaginateParams } from '../domain/worker.params';
import { WorkerRepository } from '../domain/worker.repository';

export class WorkerPaginateService {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(params: WorkerPaginateParams) {
    return this.workerRepository.paginateWorkers(params);
  }
}
