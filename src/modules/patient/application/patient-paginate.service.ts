import { PatientPaginateParams } from '../domain/patient.params';
import { PatientRepository } from '../domain/patient.repository';

export class PatientPaginateService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(params: PatientPaginateParams) {
    return this.patientRepository.paginatePatients(params);
  }
}
