import { Module } from '@nestjs/common';
import { PatientModule } from '../patient/patient.module';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';
import { ReportHttpController } from './infrastructure/controllers/report-http.controller';
import { ReportsModule as EReportModule } from '../../shared/reports/reports.module';
import { ReportDiagnosisPdfReport } from './infrastructure/reports/report-diagnosis-pdf.report';
import { ReportPatientPdfReport } from './infrastructure/reports/report-patient-pdf.report';

@Module({
  imports: [EReportModule, PatientModule, DiagnosisModule],
  providers: [ReportDiagnosisPdfReport, ReportPatientPdfReport],
  controllers: [ReportHttpController],
})
export class ReportsModule {}
