import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InsuredTypeEntity } from '../../domain/insured-type.entity';
import { PatientEntity } from 'src/modules/patient/domain/patient.entity';
import { PatientMysqlSchema } from 'src/modules/patient/infrastructure/schema/patient-mysql.schema';

@Entity('insured-types')
export class InsuredTypeMysqlSchema implements InsuredTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: Boolean })
  state: boolean;

  @OneToMany(() => PatientMysqlSchema, (patient) => patient.insuredType)
  patients: PatientEntity[];
}
