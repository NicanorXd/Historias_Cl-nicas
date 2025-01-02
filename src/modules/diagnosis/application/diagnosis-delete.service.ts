import { DiagnosisFindParams } from '../domain/diagnosis.params';
import { DiagnosisRepository } from '../domain/diagnosis.repository';

export class DiagnosisDeleteService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async execute(params: DiagnosisFindParams) {
    const data = this.diagnosisRepository.findDiagnosis(params);
    if (!data) throw new Error('El registro no existe!!!');
    return this.diagnosisRepository.deleteDiagnosis(params);
  }
}
