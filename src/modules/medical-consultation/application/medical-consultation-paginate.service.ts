import { MedicalConsultationPaginateParams } from '../domain/medical-consultation.params';
import { MedicalConsultationRepository } from '../domain/medical-consultation.repository';

export class MedicalConsultationPaginateService {
  constructor(
    private medicalConsultationRepository: MedicalConsultationRepository,
  ) {}

  async execute(params: MedicalConsultationPaginateParams) {
    return this.medicalConsultationRepository.paginateMedicalConsultations(
      params,
    );
  }
}
