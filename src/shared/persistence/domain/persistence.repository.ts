import { ManagerInterface } from './interfaces/manager.interface';
import { TransactionInterface } from './interfaces/transaction.interface';

export interface PersistenceRepository extends ManagerInterface {
  createTransaction(): Promise<TransactionInterface>;
}
