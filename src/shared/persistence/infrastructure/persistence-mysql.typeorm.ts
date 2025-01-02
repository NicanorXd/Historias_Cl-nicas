import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PersistenceMysqlEntities } from './entities/persistence-mysql.entities';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const PersistenceMysqlTypeormName = 'MYSQL_TYPEOR_DEFAULT';

export const PersistenceMysqlTypeorm = {
  provide: PersistenceMysqlTypeormName,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const logger = new Logger(PersistenceMysqlTypeormName);
    const options: MysqlConnectionOptions = {
      type: 'mysql',
      host: config.get('MYSQL_HOST'),
      port: +config.get('MYSQL_PORT'),
      database: config.get('MYSQL_NAME'),
      username: config.get('MYSQL_USER'),
      password: config.get('MYSQL_PASSWORD'),
      entities: PersistenceMysqlEntities,
      synchronize: config.get('MYSQL_SYNC') === 'true',
      logging: true,
    };

    Object.keys(options).forEach((attr) =>
      logger.debug(`${attr} => ${options[attr]}`),
    );

    return new DataSource(options).initialize();
  },
};
