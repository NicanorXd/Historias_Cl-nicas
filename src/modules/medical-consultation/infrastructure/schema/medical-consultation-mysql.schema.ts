import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedicalConsultationEntity } from '../../domain/medical-consultation.entity';
import { PatientEntity } from 'src/modules/patient/domain/patient.entity';
import { ServiceEntity } from 'src/modules/service/domain/service.entity';
import { WorkerEntity } from 'src/modules/worker/domain/worker.entity';
import { PatientMysqlSchema } from 'src/modules/patient/infrastructure/schema/patient-mysql.schema';
import { WorkerMysqlSchema } from 'src/modules/worker/infrastructure/schema/worker-mysql.schema';
import { ServiceMysqlSchema } from 'src/modules/service/infrastructure/schema/service-mysql.schema';
import { AttentionMysqlSchema } from 'src/modules/attention/infrastructure/schema/attention-mysql.schema';
import { AttentionEntity } from 'src/modules/attention/domain/attention.entity';

@Entity('medicalConsultations')
export class MedicalConsultationMysqlSchema
  implements MedicalConsultationEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  serviceId: number;

  @Column()
  workerId: number;

  @Column('date')
  date: string;

  @Column('boolean', { default: true })
  state: boolean;

  @ManyToOne(
    () => PatientMysqlSchema,
    (patient) => patient.medicalConsultations,
  )
  patient: PatientEntity;

  @ManyToOne(
    () => ServiceMysqlSchema,
    (service) => service.medicalConsultations,
  )
  service: ServiceEntity;

  @ManyToOne(() => WorkerMysqlSchema, (worker) => worker.medicalConsultations)
  worker: WorkerEntity;

  @OneToMany(
    () => AttentionMysqlSchema,
    (attention) => attention.medicalConsultation,
  )
  attentions: AttentionEntity[];
}
