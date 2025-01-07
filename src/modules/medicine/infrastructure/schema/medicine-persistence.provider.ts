import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { MedicineMysqlSchema } from './medicine-mysql.schema';

export const medicineMysqlProviderName = 'MEDICINE_MYSQL_REPORSITORY';

export const medicineMysqlProvider = [
  {
    provide: medicineMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MedicineMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
