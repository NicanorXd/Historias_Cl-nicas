import { TratamientoEntity } from './tratamiento.entity';
import { TratamientoCreateParams } from './tratamiento.params';

export class TratamientoValue implements TratamientoEntity {
  id: number;
  officeId: number;
  description: string;
  medicamento: string;
  presentation: string;
  dosis: string;
  frequency: string;
  administration: string;
  duration: string;

  constructor(params: TratamientoCreateParams) {
    this.officeId = params.officeId;
    this.description = params.description;
    this.medicamento = params.medicamento;
    this.presentation = params.presentation;
    this.dosis = params.dosis;
    this.frequency = params.frequency;
    this.administration = params.administration;
    this.duration = params.duration;
  }
}
