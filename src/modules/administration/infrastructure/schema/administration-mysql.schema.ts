import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatientEntity } from 'src/modules/patient/domain/patient.entity';
import { PatientMysqlSchema } from 'src/modules/patient/infrastructure/schema/patient-mysql.schema';
import { AdministrationEntity } from '../../domain/administration.entity';
import { TratamientoMysqlSchema } from 'src/modules/tratamiento/infrastructure/schema/tratamiendo-mysql.schema';
import { TratamientoEntity } from 'src/modules/tratamiento/domain/tratamiento.entity';

@Entity('administration')
export class AdministrationMysqlSchema implements AdministrationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: Boolean })
  state: boolean;

  @OneToMany(() => PatientMysqlSchema, (patient) => patient.insuredType)
  patients: PatientEntity[];

  @OneToMany(
    () => TratamientoMysqlSchema,
    (tratamiento) => tratamiento.administration,
  )
  tratamientos: TratamientoEntity[];
}
