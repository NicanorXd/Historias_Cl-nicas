import { DiagnosisFindParams } from '../domain/diagnosis.params';
import { DiagnosisRepository } from '../domain/diagnosis.repository';

export class DiagnosisFindService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async execute(params: DiagnosisFindParams) {
    const data = await this.diagnosisRepository.findDiagnosis(params);
    if (!data) throw new Error('No se encontró el registro');
    return data;
  }
}
