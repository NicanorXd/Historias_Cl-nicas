import { AnamnesisRepository } from 'src/modules/anamnesis/domain/anamnesis.repository';
import { OfficeCreateParams } from '../domain/office.params';
import { OfficeRepository } from '../domain/office.repository';
import { OfficeValue } from '../domain/office.value';
import { DiagnosisDetailRepository } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.repository';
import { TratamientoRepository } from 'src/modules/tratamiento/domain/tratamiento.repository';
import { AnamnesisValue } from 'src/modules/anamnesis/domain/anamnesis.value';
import { DiagnosisDetailValue } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.value';
import { TratamientoValue } from 'src/modules/tratamiento/domain/tratamiento.value';
import { AttentionRepository } from 'src/modules/attention/domain/attention.repository';

export class OfficeCreateService {
  constructor(
    private officeRepository: OfficeRepository,
    private anamnesisRepository: AnamnesisRepository,
    private diagnosisDetailRepository: DiagnosisDetailRepository,
    private tratamientoRepository: TratamientoRepository,
    private attentionRespository: AttentionRepository,
  ) {}

  async execute(params: OfficeCreateParams) {
    const transaction = await this.officeRepository.createTransaction();
    await transaction.startTransaction();
    this.anamnesisRepository.setManager(transaction.manager);
    this.diagnosisDetailRepository.setManager(transaction.manager);
    this.tratamientoRepository.setManager(transaction.manager);
    try {
      const value = new OfficeValue(params);
      const office = await this.officeRepository.createOffice(value);
      // anamnesis
      if (params.anamnesis?.timeSick) {
        const anamnesisValue = new AnamnesisValue({
          ...params.anamnesis,
          officeId: office.id,
        });
        await this.anamnesisRepository.createAnamnesis(anamnesisValue);
      }
      // diagnosis detail
      if (params.diagnosis) {
        for (const item of params.diagnosis) {
          const diagnosisDetailValue = new DiagnosisDetailValue({
            ...item,
            officeId: office.id,
          });
          await this.diagnosisDetailRepository.createDiagnosisDetail(
            diagnosisDetailValue,
          );
        }
      }
      // tratamientos
      if (params.tratamientos) {
        for (const item of params.tratamientos) {
          const tratamientoValue = new TratamientoValue({
            ...item,
            officeId: office.id,
          });
          await this.tratamientoRepository.createTratamiento(tratamientoValue);
        }
      }
      // actualizar attention
      const attentionParams = { id: office.attentionId };
      const attentionPayload = { state: false };
      await this.attentionRespository.editAttention(
        attentionParams,
        attentionPayload,
      );
      // save
      await transaction.commitTransaction();
      return office;
    } catch (error) {
      await transaction.rollbackTransaction();
      throw error;
    } finally {
      this.officeRepository.resetManager();
      this.anamnesisRepository.resetManager();
      this.diagnosisDetailRepository.resetManager();
      this.tratamientoRepository.resetManager();
      await transaction.release();
    }
  }
}
