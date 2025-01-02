import { DateTime } from 'luxon';
import { OfficeEntity } from './office.entity';
import { OfficeCreateParams } from './office.params';
import { AnamnesisEntity } from 'src/modules/anamnesis/domain/anamnesis.entity';
import { DiagnosisDetailEntity } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.entity';
import { TratamientoEntity } from 'src/modules/tratamiento/domain/tratamiento.entity';

export class OfficeValue implements OfficeEntity {
  id: number;
  attentionId: number;
  preferential?: string;
  workspace?: string;
  nextAppointment?: string;
  datetime: string;
  state: boolean;
  anamnesis?: AnamnesisEntity;
  diagnosis?: DiagnosisDetailEntity[];
  tratamientos?: TratamientoEntity[];

  constructor(params: OfficeCreateParams) {
    this.attentionId = params.attentionId;
    this.preferential = params.preferential;
    this.workspace = params.workspace;
    this.nextAppointment = params.nextAppointment;
    this.datetime = DateTime.now().toSQL();
    this.state = true;
  }
}
