import { Module } from '@nestjs/common';
import { PersistenceMysqlTypeorm } from './infrastructure/persistence-mysql.typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PersistenceMysqlTypeorm],
  exports: [PersistenceMysqlTypeorm],
})
export class PersistenceModule {}
