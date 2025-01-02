import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { RoleMysqlSchema } from './role-mysql.schema';

export const roleMysqlProviderName = 'ROLE_MYSQL_REPORSITORY';

export const roleMysqlProvider = [
  {
    provide: roleMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
