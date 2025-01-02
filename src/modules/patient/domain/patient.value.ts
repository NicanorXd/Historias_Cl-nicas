import { InsuredTypeEntity } from 'src/modules/insured-type/domain/insured-type.entity';
import { PatientEntity } from './patient.entity';
import { PatientGenderEnum } from './patient.enum';
import { PatientCreateParams } from './patient.params';

export class PatientValue implements PatientEntity {
  constructor(params: PatientCreateParams) {
    this.name = params.name;
    this.lastname = params.lastname;
    this.documentNumber = params.documentNumber;
    this.dateOfBirth = params.dateOfBirth;
    this.ubigeoBirth = params.ubigeoBirth;
    this.gender = params.gender;
    this.email = params.email;
    this.phone = params.phone;
    this.insuredTypeId = params.insuredTypeId;
    this.ubigeoCurrent = params.ubigeoCurrent;
    this.addressCurrent = params.addressCurrent;
    this.state = true;
  }

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

  public generateHistoryNumber(count: number) {
    const value = '0'.repeat(8 - `${count}`.length);
    this.historyNumber = `HC-${value}${count}`;
  }
}
