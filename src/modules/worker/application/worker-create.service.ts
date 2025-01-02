import { UserRepository } from 'src/modules/user/domain/user.repository';
import { WorkerCreateParams } from '../domain/worker.params';
import { WorkerRepository } from '../domain/worker.repository';
import { WorkerValue } from '../domain/worker.value';
import { UserValue } from 'src/modules/user/domain/user.value';
import { UserCreateParams } from 'src/modules/user/domain/user.params';

export class WorkerCreateService {
  constructor(
    private workerRepository: WorkerRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(params: WorkerCreateRequest) {
    const existsWorker = await this.workerRepository.findWorker({
      documentNumber: params.documentNumber,
    });
    // validate worker
    if (existsWorker) throw new Error('El registro ya existe!!!');
    // validate user
    const existsUser = await this.userRepository.findUser({
      username: params.username,
    });
    if (existsUser) throw new Error('El registro ya existe!!!');
    // proccess
    const transaction = await this.userRepository.createTransaction();
    transaction.startTransaction();
    this.workerRepository.setManager(transaction.manager);
    this.userRepository.setManager(transaction.manager);
    try {
      // create worker
      const valueWorker = new WorkerValue(params);
      const worker = await this.workerRepository.createWorker(valueWorker);
      // create user
      const userParams: UserCreateParams = {
        workerId: worker.id,
        username: params.username,
        password: params.password,
        roleId: params.roleId,
      };
      const valueUser = new UserValue(userParams);
      await this.userRepository.createUser(valueUser);
      await transaction.commitTransaction();
      return worker;
    } catch (error) {
      await transaction.rollbackTransaction();
      throw error;
    } finally {
      await transaction.release();
      this.userRepository.resetManager();
      this.workerRepository.resetManager();
    }
  }
}

export interface WorkerCreateRequest extends WorkerCreateParams {
  roleId: number;
  username: string;
  password: string;
}
