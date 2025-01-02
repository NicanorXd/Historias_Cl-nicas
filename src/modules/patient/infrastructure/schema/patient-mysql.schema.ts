import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PatientEntity } from '../../domain/patient.entity';
import { PatientGenderEnum } from '../../domain/patient.enum';
import { InsuredTypeEntity } from 'src/modules/insured-type/domain/insured-type.entity';
import { InsuredTypeMysqlSchema } from 'src/modules/insured-type/infrastructure/schema/insured-type-mysql.schema';
import { MedicalConsultationMysqlSchema } from 'src/modules/medical-consultation/infrastructure/schema/medical-consultation-mysql.schema';
import { MedicalConsultationEntity } from 'src/modules/medical-consultation/domain/medical-consultation.entity';

@Entity('patients')
export class PatientMysqlSchema implements PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  documentNumber: string;

  @Column('date')
  dateOfBirth: string;

  @Column()
  ubigeoBirth: string;

  @Column({ type: 'enum', enum: PatientGenderEnum })
  gender: PatientGenderEnum;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  insuredTypeId: number;

  @Column()
  ubigeoCurrent: string;

  @Column()
  addressCurrent: string;

  @Column()
  historyNumber: string;

  @Column({ type: Boolean })
  state: boolean;

  @ManyToOne(
    () => InsuredTypeMysqlSchema,
    (insuredType) => insuredType.patients,
  )
  insuredType: InsuredTypeEntity;

  @OneToMany(() => MedicalConsultationMysqlSchema, (medical) => medical.patient)
  medicalConsultations: MedicalConsultationEntity[];
}
