import { UserRepository } from 'src/modules/user/domain/user.repository';
import { WorkerEditParams, WorkerFindParams } from '../domain/worker.params';
import { WorkerRepository } from '../domain/worker.repository';
import { UserValue } from 'src/modules/user/domain/user.value';

export class WorkerEditService {
  constructor(
    private workerRepository: WorkerRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(params: WorkerFindParams, payload: WorkerEditRequest) {
    const worker = await this.workerRepository.findWorker(params);
    if (!worker) throw new Error('El registro no existe!!!');
    // setting user
    const userParams = { workerId: worker.id };
    const userPayload = {
      roleId: payload.roleId,
      username: payload.username,
      password: payload.password,
    };
    const user = await this.userRepository.findUser(userParams);
    if (!user) throw new Error('No se encontró al usuario');
    // validate change password
    if (!!userPayload.password && userPayload.password != user.password) {
      userPayload.password = UserValue.hashPassword(userPayload.password);
    }
    // process
    const transaction = await this.userRepository.createTransaction();
    await transaction.startTransaction();
    this.workerRepository.setManager(transaction.manager);
    try {
      // update user
      await this.userRepository.editUser(userParams, userPayload);
      // udate worker
      const workerParams = { id: worker.id };
      const workerPayload = Object.assign(payload, {
        roleId: undefined,
        password: undefined,
        username: undefined,
      });
      await this.workerRepository.editWorker(workerParams, workerPayload);
      // response
      await transaction.commitTransaction();
      return true;
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

export interface WorkerEditRequest extends WorkerEditParams {
  roleId?: number;
  username?: string;
  password?: string;
}
