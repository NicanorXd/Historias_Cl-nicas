import { PatientEditParams, PatientFindParams } from '../domain/patient.params';
import { PatientRepository } from '../domain/patient.repository';

export class PatientEditService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(params: PatientFindParams, payload: PatientEditParams) {
    const worker = await this.patientRepository.findPatient(params);
    if (!worker) throw new Error('El registro no existe!!!');
    return this.patientRepository.editPatient({ id: worker.id }, payload);
  }
}
