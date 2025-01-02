import { forwardRef, Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { workerMysqlProvider } from './infrastructure/schema/worker-persistence.provider';
import { WorkerMysqlRepository } from './infrastructure/repository/worker-mysql-repository';
import { WorkerHttpController } from './infrastructure/controllers/worker-http.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PersistenceModule, forwardRef(() => UserModule)],
  providers: [...workerMysqlProvider, WorkerMysqlRepository],
  exports: [...workerMysqlProvider, WorkerMysqlRepository],
  controllers: [WorkerHttpController],
})
export class WorkerModule {}
