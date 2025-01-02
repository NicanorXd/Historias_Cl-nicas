import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceEntity } from '../../domain/service.entity';
import { MedicalConsultationMysqlSchema } from 'src/modules/medical-consultation/infrastructure/schema/medical-consultation-mysql.schema';
import { MedicalConsultationEntity } from 'src/modules/medical-consultation/domain/medical-consultation.entity';

@Entity('services')
export class ServiceMysqlSchema implements ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: Boolean })
  state: boolean;

  @OneToMany(() => MedicalConsultationMysqlSchema, (medical) => medical.service)
  medicalConsultations: MedicalConsultationEntity[];
}
