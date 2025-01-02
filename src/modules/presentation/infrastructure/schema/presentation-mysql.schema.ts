import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatientEntity } from 'src/modules/patient/domain/patient.entity';
import { PatientMysqlSchema } from 'src/modules/patient/infrastructure/schema/patient-mysql.schema';
import { PresentationEntity } from '../../domain/presentation.entity';
import { TratamientoMysqlSchema } from 'src/modules/tratamiento/infrastructure/schema/tratamiendo-mysql.schema';
import { TratamientoEntity } from 'src/modules/tratamiento/domain/tratamiento.entity';

@Entity('presentation')
export class PresentationMysqlSchema implements PresentationEntity {
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
    (tratamiento) => tratamiento.presentation,
  )
  tratamientos: TratamientoEntity[];
}
