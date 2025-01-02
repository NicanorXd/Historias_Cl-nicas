import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { roleMysqlProvider } from './infrastructure/schema/role-persistence.provider';
import { RoleMysqlRepository } from './infrastructure/repository/role-mysql-repository';
import { RoleHttpController } from './infrastructure/controllers/role-http.controller';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [PersistenceModule, PermissionModule],
  providers: [...roleMysqlProvider, RoleMysqlRepository],
  exports: [...roleMysqlProvider, RoleMysqlRepository],
  controllers: [RoleHttpController],
})
export class RoleModule {}
