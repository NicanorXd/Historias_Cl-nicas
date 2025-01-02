import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { UserMysqlSchema } from './user-mysql.schema';

export const userMysqlProviderName = 'USER_MYSQL_REPORSITORY';

export const userMysqlProvider = [
  {
    provide: userMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
