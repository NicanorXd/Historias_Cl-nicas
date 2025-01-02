import { PatientCreateParams } from '../domain/patient.params';
import { PatientRepository } from '../domain/patient.repository';
import { PatientValue } from '../domain/patient.value';

export class PatientCreateService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(params: PatientCreateParams) {
    const exists = await this.patientRepository.findPatient({
      documentNumber: params.documentNumber,
    });
    // validate
    if (exists) throw new Error('El registro ya existe!!!');
    const value = new PatientValue(params);
    // generar history
    const counter = await this.patientRepository.countPatient({});
    value.generateHistoryNumber(counter + 1);
    // response
    return this.patientRepository.createPatient(value);
  }
}
