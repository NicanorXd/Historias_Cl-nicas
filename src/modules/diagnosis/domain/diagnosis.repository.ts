import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import {
  DiagnosisEditParams,
  DiagnosisFindParams,
  DiagnosisListParams,
  DiagnosisPaginateParams,
  DiagnosisReportParams,
} from './diagnosis.params';
import { DiagnosisEntity } from './diagnosis.entity';
import { DiagnosisValue } from './diagnosis.value';
import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { DiagnosisReportInterface } from './interfaces/diagnosis-report.interface';

export interface DiagnosisRepository extends PersistenceRepository {
  paginateDiagnoses(
    params: DiagnosisPaginateParams,
  ): Promise<PaginateEntity<DiagnosisEntity>>;
  listDiagnoses(params: DiagnosisListParams): Promise<DiagnosisEntity[]>;
  findDiagnosis(parms: DiagnosisFindParams): Promise<DiagnosisEntity>;
  createDiagnosis(value: DiagnosisValue): Promise<DiagnosisEntity>;
  editDiagnosis(
    params: DiagnosisFindParams,
    payload: DiagnosisEditParams,
  ): Promise<boolean>;
  deleteDiagnosis(parmas: DiagnosisFindParams): Promise<boolean>;
  listReport(
    params: DiagnosisReportParams,
  ): Promise<DiagnosisReportInterface[]>;
}
