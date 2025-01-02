import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttentionEntity } from '../../domain/attention.entity';
import { MedicalConsultationEntity } from 'src/modules/medical-consultation/domain/medical-consultation.entity';
import { MedicalConsultationMysqlSchema } from 'src/modules/medical-consultation/infrastructure/schema/medical-consultation-mysql.schema';
import { OfficeMysqlSchema } from 'src/modules/office/infrastructure/schema/office-mysql.schema';
import { OfficeEntity } from 'src/modules/office/domain/office.entity';

@Entity('attentions')
export class AttentionMysqlSchema implements AttentionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medicalConsultationId: number;

  @Column()
  mmhg: string;

  @Column()
  weigth: string;

  @Column()
  temperature: string;

  @Column()
  talle: string;

  @Column()
  fc: string;

  @Column()
  imc: string;

  @Column()
  generalCondition: string;

  @Column('boolean', { default: true })
  state: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => MedicalConsultationMysqlSchema,
    (medicalConsultation) => medicalConsultation.attentions,
  )
  medicalConsultation: MedicalConsultationEntity;

  @OneToOne(() => OfficeMysqlSchema, (office) => office.attention)
  office: OfficeEntity;
}
