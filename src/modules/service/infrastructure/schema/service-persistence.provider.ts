import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { ServiceMysqlSchema } from './service-mysql.schema';

export const serviceMysqlProviderName = 'SERVICE_MYSQL_REPORSITORY';

export const serviceMysqlProvider = [
  {
    provide: serviceMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ServiceMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
