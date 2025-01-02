import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { AttentionMysqlSchema } from './attention-mysql.schema';

export const attentionMysqlProviderName = 'ATTENTION_MYSQL_REPORSITORY';

export const attentionMysqlProvider = [
  {
    provide: attentionMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AttentionMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
