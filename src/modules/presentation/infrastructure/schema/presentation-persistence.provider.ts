import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { PresentationMysqlSchema } from './presentation-mysql.schema';

export const presentationMysqlProviderName = 'PRESENTATION_MYSQL_REPORSITORY';

export const presentationMysqlProvider = [
  {
    provide: presentationMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PresentationMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
