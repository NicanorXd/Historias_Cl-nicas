import { UserRepository } from 'src/modules/user/domain/user.repository';
import { WorkerFindParams } from '../domain/worker.params';
import { WorkerRepository } from '../domain/worker.repository';

export class WorkerDeleteService {
  constructor(
    private workerRepository: WorkerRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(params: WorkerFindParams) {
    const worker = await this.workerRepository.findWorker(params);
    if (!worker) throw new Error('El registro no existe!!!');
    const transaction = await this.userRepository.createTransaction();
    await transaction.startTransaction();
    this.workerRepository.setManager(transaction.manager);
    try {
      const workerParams = { id: worker.id };
      const userParams = { workerId: worker.id };
      await this.userRepository.deleteUser(userParams);
      await this.workerRepository.deleteWorker(workerParams);
      await transaction.commitTransaction();
      return true;
    } catch (error) {
      await transaction.rollbackTransaction();
      throw error;
    } finally {
      await transaction.release();
      this.workerRepository.resetManager();
      this.userRepository.resetManager();
    }
  }
}
