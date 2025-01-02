import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { WorkerMysqlSchema } from './worker-mysql.schema';

export const workerMysqlProviderName = 'WORKER_MYSQL_REPORSITORY';

export const workerMysqlProvider = [
  {
    provide: workerMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WorkerMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
