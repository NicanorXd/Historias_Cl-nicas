export interface TratamientoFindParams {
  officeId?: number;
}

export interface TratamientoCreateParams {
  officeId: number;
  description: string;
  medicamento: string;
  presentationId: number;
  dosis: string;
  frequency: string;
  administrationId: number;
  duration: string;
}
