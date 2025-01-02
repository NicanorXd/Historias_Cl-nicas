import { PatientEntity } from 'src/modules/patient/domain/patient.entity';
import { ServiceEntity } from 'src/modules/service/domain/service.entity';
import { WorkerEntity } from 'src/modules/worker/domain/worker.entity';
import { MedicalConsultationEntity } from './medical-consultation.entity';
import { MedicalConsultationCreateParams } from './medical-consultation.params';

export class MedicalConsultationValue implements MedicalConsultationEntity {
  constructor(params: MedicalConsultationCreateParams) {
    this.patientId = params.patientId;
    this.serviceId = params.serviceId;
    this.workerId = params.workerId;
    this.date = params.date;
    this.state = true;
  }

  id: number;
  patientId: number;
  serviceId: number;
  workerId: number;
  date: string;
  state: boolean;

  patient: PatientEntity;
  service: ServiceEntity;
  worker: WorkerEntity;
}
