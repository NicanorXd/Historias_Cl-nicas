export interface TratamientoFindParams {
  officeId?: number;
}

export interface TratamientoCreateParams {
  officeId: number;
  description: string;
  medicamento: string;
  presentation: string;
  dosis: string;
  frequency: string;
  administration: string;
  duration: string;
}
