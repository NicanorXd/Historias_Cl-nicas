import { Repository } from 'typeorm';
import { WorkerMysqlSchema } from '../../schema/worker-mysql.schema';
import { WorkerListParams } from 'src/modules/worker/domain/worker.params';

export class WorkerSelectMysqlQuery {
  constructor(private repository: Repository<WorkerMysqlSchema>) {}

  public query(params: WorkerListParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('w')
      .innerJoinAndSelect('w.profession', 'p')
      .innerJoinAndSelect('w.user', 'u');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`w.id = '${params.id}'`);
    }

    if (params.documentNumber) {
      queryBuilder.andWhere(`w.documentNumber = '${params.documentNumber}'`);
    }

    if (params.querySearch) {
      queryBuilder.andWhere(
        `(
          CONCAT(w.name, CONCAT(' ', w.lastname)) LIKE '%${params.querySearch}%' OR 
          CONCAT(w.lastname, CONCAT(' ', w.name)) LIKE '%${params.querySearch}%' OR
          CONCAT(w.name, w.lastname) LIKE '%${params.querySearch}%' OR
          CONCAT(w.lastname, w.name) LIKE '%${params.querySearch}%'
        )`,
      );
    }
    // response
    return queryBuilder;
  }
}
