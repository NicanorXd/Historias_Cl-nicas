import { MedicalConsultationFindParams } from '../domain/medical-consultation.params';
import { MedicalConsultationRepository } from '../domain/medical-consultation.repository';

export class MedicalConsultationDeleteService {
  constructor(
    private medicalConsultationRepository: MedicalConsultationRepository,
  ) {}

  async execute(params: MedicalConsultationFindParams) {
    const data =
      await this.medicalConsultationRepository.findMedicalConsultation(params);
    if (!data) throw new Error('El registro no existe!!!');
    return this.medicalConsultationRepository.deleteMedicalConsultation({
      id: data.id,
    });
  }
}
