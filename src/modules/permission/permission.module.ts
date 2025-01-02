import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { PermissionMysqlRepository } from './infrastructure/repository/permission-mysql-repository';

@Module({
  imports: [PersistenceModule],
  providers: [PermissionMysqlRepository],
  exports: [PermissionMysqlRepository],
})
export class PermissionModule {}
