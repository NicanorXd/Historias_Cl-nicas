import { InsuredTypeEntity } from 'src/modules/insured-type/domain/insured-type.entity';
import { PatientGenderEnum } from './patient.enum';

export interface PatientEntity {
  id: number;
  name: string;
  lastname: string;
  documentNumber: string;
  dateOfBirth: string;
  ubigeoBirth: string;
  gender: PatientGenderEnum;
  email?: string;
  phone?: string;
  insuredTypeId: number;
  ubigeoCurrent: string;
  addressCurrent: string;
  historyNumber: string;
  state: boolean;

  insuredType: InsuredTypeEntity;
}
