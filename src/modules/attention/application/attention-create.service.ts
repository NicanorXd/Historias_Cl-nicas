import { MedicalConsultationRepository } from 'src/modules/medical-consultation/domain/medical-consultation.repository';
import { AttentionCreateParams } from '../domain/attention.params';
import { AttentionRepository } from '../domain/attention.repository';
import { AttentionValue } from '../domain/attention.value';

export class AttentionCreateService {
  constructor(
    private attentionRepository: AttentionRepository,
    private medicalConsultationRepository: MedicalConsultationRepository,
  ) {}

  async execute(params: AttentionCreateParams) {
    const value = new AttentionValue(params);
    const data = await this.attentionRepository.createAttention(value);
    // actualizar attention
    const attentionParams = { id: value.medicalConsultationId };
    const attentionPayload = { state: false };
    await this.medicalConsultationRepository.editMedicalConsultation(
      attentionParams,
      attentionPayload,
    );
    return data;
  }
}
