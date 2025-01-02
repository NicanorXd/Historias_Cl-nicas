import { DiagnosisPaginateParams } from '../domain/diagnosis.params';
import { DiagnosisRepository } from '../domain/diagnosis.repository';

export class DiagnosisPaginateService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async execute(params: DiagnosisPaginateParams) {
    return this.diagnosisRepository.paginateDiagnoses(params);
  }
}
