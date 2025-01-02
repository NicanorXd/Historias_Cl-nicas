import { AnamnesisEntity } from 'src/modules/anamnesis/domain/anamnesis.entity';
import { AttentionEntity } from 'src/modules/attention/domain/attention.entity';
import { DiagnosisDetailEntity } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.entity';
import { TratamientoEntity } from 'src/modules/tratamiento/domain/tratamiento.entity';

export interface OfficeEntity {
  id: number;
  attentionId: number;
  preferential?: string;
  workspace?: string;
  nextAppointment?: string;
  anamnesis?: AnamnesisEntity;
  diagnosis?: DiagnosisDetailEntity[];
  tratamientos?: TratamientoEntity[];
  datetime: string;
  state: boolean;
  attention?: AttentionEntity;
}
