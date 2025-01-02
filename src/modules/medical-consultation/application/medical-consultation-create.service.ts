import { MedicalConsultationCreateParams } from '../domain/medical-consultation.params';
import { MedicalConsultationRepository } from '../domain/medical-consultation.repository';
import { MedicalConsultationValue } from '../domain/medical-consultation.value';

export class MedicalConsultationCreateService {
  constructor(
    private medicalConsultationRepository: MedicalConsultationRepository,
  ) {}

  async execute(params: MedicalConsultationCreateParams) {
    // response
    const value = new MedicalConsultationValue(params);
    return this.medicalConsultationRepository.createMedicalConsultation(value);
  }
}
