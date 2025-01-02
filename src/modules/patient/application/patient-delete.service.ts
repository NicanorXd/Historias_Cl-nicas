import { PatientFindParams } from '../domain/patient.params';
import { PatientRepository } from '../domain/patient.repository';

export class PatientDeleteService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(params: PatientFindParams) {
    const exists = this.patientRepository.findPatient(params);
    if (!exists) throw new Error('El registro no existe!!!');
    return this.patientRepository.deletePatient(params);
  }
}
