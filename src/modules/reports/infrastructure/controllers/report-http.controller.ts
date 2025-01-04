import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiagnosisMysqlRepository } from 'src/modules/diagnosis/infrastructure/repository/diagnosis-mysql-repository';
import { PatientMysqlRepository } from 'src/modules/patient/infrastructure/repository/patient-mysql-repository';
import { ReportPatientListService } from '../../application/report-patient-list.service';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { ReportPatientListDto } from './dtos/report-patient-list.dto';
import { ReportDiagnosisListDto } from './dtos/report-diagnosis-list.dto';
import { ReportDiagnosisListService } from '../../application/report-diagnosis-list.service';
import { ReportDiagnosisPdfReport } from '../reports/report-diagnosis-pdf.report';
import { ReportPatientPdfReport } from '../reports/report-patient-pdf.report';

@ApiTags('reports')
@Controller('reports')
export class ReportHttpController {
  constructor(
    private patientRepository: PatientMysqlRepository,
    private diagnosisRepository: DiagnosisMysqlRepository,
    private reportDiagnosisPdfReport: ReportDiagnosisPdfReport,
    private reportPatientPdfReport: ReportPatientPdfReport,
  ) {}

  @Get('patients')
  async reportPatient(@Query() params: ReportPatientListDto) {
    const service = new ReportPatientListService(this.patientRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get('patients.pdf')
  async reportPatientPdf(@Query() params: ReportPatientListDto) {
    return this.reportPatientPdfReport
      .execute(params)
      .then((data) => new StreamableFile(data.buffer, { type: data.type }))
      .catch((err) => {
        throw new HttpExceptionCustom(err);
      });
  }

  @Get('diagnosis')
  async reportDiagnosis(@Query() params: ReportDiagnosisListDto) {
    const service = new ReportDiagnosisListService(this.diagnosisRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get('diagnosis.pdf')
  async reportDiagnosisPdf(@Query() params: ReportDiagnosisListDto) {
    return this.reportDiagnosisPdfReport
      .execute(params)
      .then((data) => new StreamableFile(data.buffer, { type: data.type }))
      .catch((err) => {
        throw new HttpExceptionCustom(err);
      });
  }
}
