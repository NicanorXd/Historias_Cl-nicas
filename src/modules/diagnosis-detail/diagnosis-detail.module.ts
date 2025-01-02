import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { DiagnosisDetailMysqlRepository } from './infrastructure/repository/diagnosis-detail-repository';

@Module({
  imports: [PersistenceModule],
  providers: [DiagnosisDetailMysqlRepository],
  exports: [DiagnosisDetailMysqlRepository],
})
export class DiagnosisDetailModule {}
