import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { ProfessionMysqlSchema } from './profession-mysql.schema';

export const professionMysqlProviderName = 'PROFESSION_MYSQL_REPORSITORY';

export const professionMysqlProvider = [
  {
    provide: professionMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProfessionMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
