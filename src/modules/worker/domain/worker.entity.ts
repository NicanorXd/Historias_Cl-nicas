import { ProfessionEntity } from 'src/modules/profession/domain/profession.entity';
import { WorkerGenderEnum } from './worker.enum';
import { UserEntity } from 'src/modules/user/domain/user.entity';

export interface WorkerEntity {
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
