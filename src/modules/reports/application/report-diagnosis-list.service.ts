import { DiagnosisReportParams } from 'src/modules/diagnosis/domain/diagnosis.params';
import { DiagnosisRepository } from 'src/modules/diagnosis/domain/diagnosis.repository';

export class ReportDiagnosisListService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async execute(params: DiagnosisReportParams) {
    return this.diagnosisRepository.listReport(params);
  }
}
