import {
  DiagnosisEditParams,
  DiagnosisFindParams,
} from '../domain/diagnosis.params';
import { DiagnosisRepository } from '../domain/diagnosis.repository';

export class DiagnosisEditService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async execute(params: DiagnosisFindParams, payload: DiagnosisEditParams) {
    const data = await this.diagnosisRepository.findDiagnosis(params);
    if (!data) throw new Error('El registro no existe!!!');
    return this.diagnosisRepository.editDiagnosis({ id: data.id }, payload);
  }
}
