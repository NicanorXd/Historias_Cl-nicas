import { TratamientoEntity } from './tratamiento.entity';
import { TratamientoCreateParams } from './tratamiento.params';

export class TratamientoValue implements TratamientoEntity {
  id: number;
  officeId: number;
  description: string;
  medicamento: string;
  presentationId: number;
  dosis: string;
  frequency: string;
  administrationId: number;
  duration: string;

  constructor(params: TratamientoCreateParams) {
    this.officeId = params.officeId;
    this.description = params.description;
    this.medicamento = params.medicamento;
    this.presentationId = params.presentationId;
    this.dosis = params.dosis;
    this.frequency = params.frequency;
    this.administrationId = params.administrationId;
    this.duration = params.duration;
  }
}
