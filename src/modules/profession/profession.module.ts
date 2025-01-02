import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { ProfessionMysqlRepository } from './infrastructure/repository/profession-mysql-repository';
import { professionMysqlProvider } from './infrastructure/schema/profession-persistence.provider';
import { ProfessionHttpController } from './infrastructure/controllers/profession-http.controller';

@Module({
  imports: [PersistenceModule],
  providers: [...professionMysqlProvider, ProfessionMysqlRepository],
  exports: [...professionMysqlProvider, ProfessionMysqlRepository],
  controllers: [ProfessionHttpController],
})
export class ProfessionModule {}
