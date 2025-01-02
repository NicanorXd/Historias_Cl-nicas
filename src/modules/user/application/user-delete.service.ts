import { WorkerRepository } from 'src/modules/worker/domain/worker.repository';
import { UserFindParams } from '../domain/user.params';
import { UserRepository } from '../domain/user.repository';

export class UserDeleteService {
  constructor(
    private userRepository: UserRepository,
    private workerRepository: WorkerRepository,
  ) {}

  async execute(params: UserFindParams) {
    const user = await this.userRepository.findUser(params);
    if (!user) throw new Error('errors.userNotFound');
    const transaction = await this.userRepository.createTransaction();
    await transaction.startTransaction();
    this.workerRepository.setManager(transaction.manager);
    try {
      const workerParams = { id: user.workerId };
      const userParams = { id: user.id };
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
