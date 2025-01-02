import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { AdministrationHttpController } from './infrastructure/controllers/administration-http.controller';
import { administrationMysqlProvider } from './infrastructure/schema/administration-persistence.provider';
import { AdministrationMysqlRepository } from './infrastructure/repository/administration-mysql-repository';

@Module({
  imports: [PersistenceModule],
  providers: [...administrationMysqlProvider, AdministrationMysqlRepository],
  exports: [...administrationMysqlProvider, AdministrationMysqlRepository],
  controllers: [AdministrationHttpController],
})
export class AdministrationModule {}
