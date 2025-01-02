import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { InsuredTypeMysqlSchema } from './insured-type-mysql.schema';

export const insuredTypeMysqlProviderName = 'INSURED_TYPE_MYSQL_REPORSITORY';

export const insuredTypeMysqlProvider = [
  {
    provide: insuredTypeMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InsuredTypeMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
