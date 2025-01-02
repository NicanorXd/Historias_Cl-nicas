import { AttentionCreateParams } from './attention.params';
import { AttentionEntity } from './attention.entity';
import { MedicalConsultationEntity } from 'src/modules/medical-consultation/domain/medical-consultation.entity';

export class AttentionValue implements AttentionEntity {
  constructor(params: AttentionCreateParams) {
    this.medicalConsultationId = params.medicalConsultationId;
    this.mmhg = params.mmhg;
    this.weigth = params.weigth;
    this.temperature = params.temperature;
    this.talle = params.talle;
    this.fc = params.fc;
    this.imc = params.imc;
    this.generalCondition = params.generalCondition;
    this.state = true;
  }

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
