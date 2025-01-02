import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { AdministrationMysqlSchema } from './administration-mysql.schema';

export const administrationMysqlProviderName =
  'ADMINISTRATION_MYSQL_REPORSITORY';

export const administrationMysqlProvider = [
  {
    provide: administrationMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AdministrationMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
