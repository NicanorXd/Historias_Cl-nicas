import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { OfficeHttpController } from './infrastructure/controllers/office-http.controller';
import { OfficeMysqlRepository } from './infrastructure/repository/office-mysql-repository';
import { DiagnosisDetailModule } from '../diagnosis-detail/diagnosis-detail.module';
import { TratamientoModule } from '../tratamiento/tratamiento.module';
import { AnamnesisModule } from '../anamnesis/anamnesis.module';
import { AttentionModule } from '../attention/attention.module';
import { OfficeHistoryHtmlReport } from './infrastructure/reports/office-history-html.report';
import { ReportsModule } from 'src/shared/reports/reports.module';
import { OfficeRecetaHtmlReport } from './infrastructure/reports/office-receta-html.report';

@Module({
  imports: [
    PersistenceModule,
    ReportsModule,
    AnamnesisModule,
    DiagnosisDetailModule,
    TratamientoModule,
    AttentionModule,
  ],
  providers: [
    OfficeMysqlRepository,
    OfficeHistoryHtmlReport,
    OfficeRecetaHtmlReport,
  ],
  exports: [OfficeMysqlRepository],
  controllers: [OfficeHttpController],
})
export class OfficeModule {}
