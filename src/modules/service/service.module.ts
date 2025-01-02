import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { serviceMysqlProvider } from './infrastructure/schema/service-persistence.provider';
import { ServiceMysqlRepository } from './infrastructure/repository/service-mysql-repository';
import { ServiceHttpController } from './infrastructure/controllers/service-http.controller';

@Module({
  imports: [PersistenceModule],
  providers: [...serviceMysqlProvider, ServiceMysqlRepository],
  exports: [...serviceMysqlProvider, ServiceMysqlRepository],
  controllers: [ServiceHttpController],
})
export class ServiceModule {}
