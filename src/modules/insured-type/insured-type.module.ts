import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { InsuredTypeHttpController } from './infrastructure/controllers/insured-type-http.controller';
import { insuredTypeMysqlProvider } from './infrastructure/schema/insured-type-persistence.provider';
import { InsuredTypeMysqlRepository } from './infrastructure/repository/insured-type-mysql-repository';

@Module({
  imports: [PersistenceModule],
  providers: [...insuredTypeMysqlProvider, InsuredTypeMysqlRepository],
  exports: [...insuredTypeMysqlProvider, InsuredTypeMysqlRepository],
  controllers: [InsuredTypeHttpController],
})
export class InsuredTypeModule {}
