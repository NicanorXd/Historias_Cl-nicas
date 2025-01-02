import { PatientFindParams } from '../domain/patient.params';
import { PatientRepository } from '../domain/patient.repository';

export class PatientFindService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(params: PatientFindParams) {
    const data = await this.patientRepository.findPatient(params);
    if (!data) throw new Error('No se encontró el registro');
    return data;
  }
}
