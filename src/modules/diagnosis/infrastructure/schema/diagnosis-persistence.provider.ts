import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { DiagnosisMysqlSchema } from './diagnosis-mysql.schema';

export const diagnosisMysqlProviderName = 'DIAGNOSIS_MYSQL_REPORSITORY';

export const diagnosisMysqlProvider = [
  {
    provide: diagnosisMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DiagnosisMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
