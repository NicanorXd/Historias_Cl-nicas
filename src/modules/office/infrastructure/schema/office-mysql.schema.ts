import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OfficeEntity } from '../../domain/office.entity';
import { AnamensisMysqlSchema } from 'src/modules/anamnesis/infrastructure/schema/anamnesis-mysql.schema';
import { AnamnesisEntity } from 'src/modules/anamnesis/domain/anamnesis.entity';
import { DiagnosisDetailMysqlSchema } from 'src/modules/diagnosis-detail/infrastructure/schema/diagnosis-detail-mysql.schema';
import { DiagnosisDetailEntity } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.entity';
import { TratamientoMysqlSchema } from 'src/modules/tratamiento/infrastructure/schema/tratamiendo-mysql.schema';
import { TratamientoEntity } from 'src/modules/tratamiento/domain/tratamiento.entity';
import { AttentionEntity } from 'src/modules/attention/domain/attention.entity';
import { AttentionMysqlSchema } from 'src/modules/attention/infrastructure/schema/attention-mysql.schema';
import { officeEntityName } from '../../domain/office.constans';

@Entity(officeEntityName)
export class OfficeMysqlSchema implements OfficeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attentionId: number;

  @Column({ nullable: true })
  preferential?: string;

  @Column({ nullable: true })
  workspace?: string;

  @Column({ nullable: true })
  nextAppointment?: string;

  @Column('datetime')
  datetime: string;

  @Column({ type: 'boolean', default: true })
  state: boolean;

  @OneToOne(() => AttentionMysqlSchema, (attention) => attention.office)
  @JoinColumn()
  attention: AttentionEntity;

  @OneToOne(() => AnamensisMysqlSchema, (anamnesis) => anamnesis.office)
  anamnesis?: AnamnesisEntity;

  @OneToMany(() => DiagnosisDetailMysqlSchema, (detail) => detail.office)
  diagnosis?: DiagnosisDetailEntity[];

  @OneToMany(() => TratamientoMysqlSchema, (tratamiento) => tratamiento.office)
  tratamientos?: TratamientoEntity[];
}
