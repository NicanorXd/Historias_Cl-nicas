import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { DiagnosisMysqlRepository } from './infrastructure/repository/diagnosis-mysql-repository';
import { diagnosisMysqlProvider } from './infrastructure/schema/diagnosis-persistence.provider';
import { DiagnosisHttpController } from './infrastructure/controllers/diagnosis-http.controller';

@Module({
  imports: [PersistenceModule],
  providers: [...diagnosisMysqlProvider, DiagnosisMysqlRepository],
  exports: [...diagnosisMysqlProvider, DiagnosisMysqlRepository],
  controllers: [DiagnosisHttpController],
})
export class DiagnosisModule {}
