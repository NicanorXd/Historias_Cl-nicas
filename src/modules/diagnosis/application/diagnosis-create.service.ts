import { DiagnosisCreateParams } from '../domain/diagnosis.params';
import { DiagnosisRepository } from '../domain/diagnosis.repository';
import { DiagnosisValue } from '../domain/diagnosis.value';

export class DiagnosisCreateService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async execute(params: DiagnosisCreateParams) {
    const exists = await this.diagnosisRepository.findDiagnosis({
      cie10: params.cie10,
    });
    // validate
    if (exists) throw new Error('El registro ya existe!!!');
    // response
    const value = new DiagnosisValue(params);
    return this.diagnosisRepository.createDiagnosis(value);
  }
}
