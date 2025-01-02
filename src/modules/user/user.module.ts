import { forwardRef, Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { UserMysqlRepository } from './infrastructure/repository/user-mysql-repository';
import { UserHttpController } from './infrastructure/controllers/user-http.controller';
import { AuthModule } from '../auth/auth.module';
import { userMysqlProvider } from './infrastructure/schema/user-persistence.provider';
import { WorkerModule } from '../worker/worker.module';

@Module({
  imports: [
    PersistenceModule,
    forwardRef(() => AuthModule),
    forwardRef(() => WorkerModule),
  ],
  providers: [...userMysqlProvider, UserMysqlRepository],
  exports: [...userMysqlProvider, UserMysqlRepository],
  controllers: [UserHttpController],
})
export class UserModule {}
