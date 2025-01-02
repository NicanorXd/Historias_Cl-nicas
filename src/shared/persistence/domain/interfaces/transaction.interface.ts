import { EntityManager } from 'typeorm';

export interface TransactionInterface {
  manager: EntityManager;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  release(): Promise<void>;
}
