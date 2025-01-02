import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { DiagnosisDetailEntity } from './diagnosis-detail.entity';
import { DiagnosisDetailValue } from './diagnosis-detail.value';
import { DiagnosisDetailFindParams } from './diagnosis-detail.params';

export interface DiagnosisDetailRepository extends PersistenceRepository {
  createDiagnosisDetail(
    value: DiagnosisDetailValue,
  ): Promise<DiagnosisDetailEntity>;
  deleteDiagnosisDetail(params: DiagnosisDetailFindParams): Promise<boolean>;
}
