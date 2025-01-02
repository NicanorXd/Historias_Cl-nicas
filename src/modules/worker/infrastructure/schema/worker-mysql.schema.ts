import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkerEntity } from '../../domain/worker.entity';
import { WorkerGenderEnum } from '../../domain/worker.enum';
import { ProfessionMysqlSchema } from 'src/modules/profession/infrastructure/schema/profession-mysql.schema';
import { ProfessionEntity } from 'src/modules/profession/domain/profession.entity';
import { UserMysqlSchema } from 'src/modules/user/infrastructure/schema/user-mysql.schema';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { MedicalConsultationMysqlSchema } from 'src/modules/medical-consultation/infrastructure/schema/medical-consultation-mysql.schema';
import { MedicalConsultationEntity } from 'src/modules/medical-consultation/domain/medical-consultation.entity';

@Entity('workers')
export class WorkerMysqlSchema implements WorkerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  documentNumber: string;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: WorkerGenderEnum;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  ubigeoBirth: string;

  @Column()
  addressCurrent: string;

  @Column()
  professionId: number;

  @Column()
  tuitionNumber: string;

  @Column({ type: Boolean })
  state: boolean;

  @ManyToOne(() => ProfessionMysqlSchema, (profession) => profession.workers)
  profession: ProfessionEntity;

  @OneToOne(() => UserMysqlSchema, (user) => user.worker)
  user: UserEntity;

  @OneToMany(() => MedicalConsultationMysqlSchema, (medical) => medical.worker)
  medicalConsultations: MedicalConsultationEntity[];
}
