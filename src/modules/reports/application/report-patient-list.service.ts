import { PatientReportParams } from 'src/modules/patient/domain/patient.params';
import { PatientRepository } from 'src/modules/patient/domain/patient.repository';

export class ReportPatientListService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(params: PatientReportParams) {
    return this.patientRepository.listReport(params);
  }
}
