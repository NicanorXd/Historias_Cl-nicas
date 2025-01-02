import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { AnamnesisMysqlRepository } from './infrastructure/repository/anamnesis-mysql-repository';

@Module({
  imports: [PersistenceModule],
  providers: [AnamnesisMysqlRepository],
  exports: [AnamnesisMysqlRepository],
})
export class AnamnesisModule {}
