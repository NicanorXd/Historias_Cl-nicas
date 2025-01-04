import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import {
  PatientEditParams,
  PatientFindParams,
  PatientListParams,
  PatientPaginateParams,
  PatientReportParams,
} from './patient.params';
import { PatientEntity } from './patient.entity';
import { PatientValue } from './patient.value';
import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { PatientReportInterface } from './interfaces/patient-report.interface';

export interface PatientRepository extends PersistenceRepository {
  paginatePatients(
    params: PatientPaginateParams,
  ): Promise<PaginateEntity<PatientEntity>>;
  listPatients(params: PatientListParams): Promise<PatientEntity[]>;
  findPatient(parms: PatientFindParams): Promise<PatientEntity>;
  createPatient(value: PatientValue): Promise<PatientEntity>;
  editPatient(
    params: PatientFindParams,
    payload: PatientEditParams,
  ): Promise<boolean>;
  deletePatient(parmas: PatientFindParams): Promise<boolean>;
  countPatient(parmas: PatientListParams): Promise<number>;
  listReport(params: PatientReportParams): Promise<PatientReportInterface[]>;
}
