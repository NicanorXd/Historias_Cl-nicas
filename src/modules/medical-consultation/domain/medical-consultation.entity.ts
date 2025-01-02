import { PatientEntity } from 'src/modules/patient/domain/patient.entity';
import { ServiceEntity } from 'src/modules/service/domain/service.entity';
import { WorkerEntity } from 'src/modules/worker/domain/worker.entity';

export interface MedicalConsultationEntity {
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
