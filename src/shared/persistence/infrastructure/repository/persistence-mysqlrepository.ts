import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { TransactionInterface } from '../../domain/interfaces/transaction.interface';
import { PersistenceRepository } from '../../domain/persistence.repository';
import { PersistenceMysqlTypeormName } from '../persistence-mysql.typeorm';

@Injectable()
export class PersistenceMysqlRepository implements PersistenceRepository {
  constructor(
    @Inject(PersistenceMysqlTypeormName) private dataSource: DataSource,
  ) {
    this.manager = dataSource.manager;
  }

  protected manager: EntityManager;

  setManager(manager: EntityManager): void {
    this.manager = manager;
  }

  getManager(): EntityManager {
    return this.manager;
  }

  resetManager(): void {
    this.manager = this.dataSource.manager;
  }

  async createTransaction(): Promise<TransactionInterface> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  }
}
