import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { MedicalConsultationEntity } from './medical-consultation.entity';
import {
  MedicalConsultationEditParams,
  MedicalConsultationFindParams,
  MedicalConsultationPaginateParams,
} from './medical-consultation.params';
import { MedicalConsultationValue } from './medical-consultation.value';

export interface MedicalConsultationRepository {
  paginateMedicalConsultations(
    params: MedicalConsultationPaginateParams,
  ): Promise<PaginateEntity<MedicalConsultationEntity>>;
  findMedicalConsultation(
    params: MedicalConsultationFindParams,
  ): Promise<MedicalConsultationEntity>;
  createMedicalConsultation(
    value: MedicalConsultationValue,
  ): Promise<MedicalConsultationEntity>;
  editMedicalConsultation(
    params: MedicalConsultationFindParams,
    payload: MedicalConsultationEditParams,
  ): Promise<boolean>;
  deleteMedicalConsultation(
    params: MedicalConsultationFindParams,
  ): Promise<boolean>;
}
