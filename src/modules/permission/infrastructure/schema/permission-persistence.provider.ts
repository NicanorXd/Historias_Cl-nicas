import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { PermissionMysqlSchema } from './permission-mysql.schema';

export const permissionMysqlProviderName = 'PERMISSION_MYSQL_REPORSITORY';

export const permissionMysqlProvider = [
  {
    provide: permissionMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PermissionMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
