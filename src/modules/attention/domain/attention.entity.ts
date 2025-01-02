import { MedicalConsultationEntity } from 'src/modules/medical-consultation/domain/medical-consultation.entity';

export interface AttentionEntity {
  id: number;
  medicalConsultationId: number;
  mmhg: string;
  weigth: string;
  temperature: string;
  talle: string;
  fc: string;
  imc: string;
  generalCondition: string;
  state: boolean;

  medicalConsultation: MedicalConsultationEntity;
}
