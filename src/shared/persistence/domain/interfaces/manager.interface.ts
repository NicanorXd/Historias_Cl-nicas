import { EntityManager } from 'typeorm';

export interface ManagerInterface {
  setManager(manager: EntityManager): void;
  getManager(): EntityManager;
  resetManager(): void;
}
