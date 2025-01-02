import { ProfessionEntity } from 'src/modules/profession/domain/profession.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { WorkerEntity } from './worker.entity';
import { WorkerGenderEnum } from './worker.enum';
import { WorkerCreateParams } from './worker.params';

export class WorkerValue implements WorkerEntity {
  constructor(params: WorkerCreateParams) {
    this.name = params.name;
    this.lastname = params.lastname;
    this.documentNumber = params.documentNumber;
    this.dateOfBirth = params.dateOfBirth;
    this.gender = params.gender;
    this.email = params.email;
    this.phone = params.phone;
    this.ubigeoBirth = params.ubigeoBirth;
    this.addressCurrent = params.addressCurrent;
    this.professionId = params.professionId;
    this.tuitionNumber = params.tuitionNumber;
    this.state = true;
  }

  id: number;
  name: string;
  lastname: string;
  documentNumber: string;
  dateOfBirth: string;
  gender: WorkerGenderEnum;
  email: string;
  phone: string;
  ubigeoBirth: string;
  addressCurrent: string;
  professionId: number;
  tuitionNumber: string;
  state: boolean;

  profession: ProfessionEntity;
  user: UserEntity;
}
