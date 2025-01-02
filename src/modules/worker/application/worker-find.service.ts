import { WorkerFindParams } from '../domain/worker.params';
import { WorkerRepository } from '../domain/worker.repository';

export class WorkerFindService {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(params: WorkerFindParams) {
    const data = await this.workerRepository.findWorker(params);
    if (!data) throw new Error('No se encontró el registro');
    return data;
  }
}
