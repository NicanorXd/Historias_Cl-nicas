import { AnamnesisRepository } from 'src/modules/anamnesis/domain/anamnesis.repository';
import { OfficeEditParams, OfficeFindParams } from '../domain/office.params';
import { OfficeRepository } from '../domain/office.repository';
import { DiagnosisDetailRepository } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.repository';
import { TratamientoRepository } from 'src/modules/tratamiento/domain/tratamiento.repository';
import { AnamnesisValue } from 'src/modules/anamnesis/domain/anamnesis.value';
import { DiagnosisDetailValue } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.value';
import { TratamientoValue } from 'src/modules/tratamiento/domain/tratamiento.value';

export class OfficeEditService {
  constructor(
    private officeRepository: OfficeRepository,
    private anamnesisRepository: AnamnesisRepository,
    private diagnosisDetailRepository: DiagnosisDetailRepository,
    private tratamientoRepository: TratamientoRepository,
  ) {}

  async execute(params: OfficeFindParams, payload: OfficeEditParams) {
    // validar office
    const office = await this.officeRepository.findOffice(params);
    if (!office) throw new Error('No se encontró el registro');
    // process
    const transaction = await this.officeRepository.createTransaction();
    await transaction.startTransaction();
    this.anamnesisRepository.setManager(transaction.manager);
    this.diagnosisDetailRepository.setManager(transaction.manager);
    this.tratamientoRepository.setManager(transaction.manager);
    try {
      // eliminar data
      await Promise.all([
        this.anamnesisRepository.deleteAnamnesis({
          officeId: office.id,
        }),
        this.diagnosisDetailRepository.deleteDiagnosisDetail({
          officeId: office.id,
        }),
        this.tratamientoRepository.deleteTratamiento({
          officeId: office.id,
        }),
      ]);
      // anamnesis
      if (payload.anamnesis?.timeSick) {
        const anamnesisValue = new AnamnesisValue({
          ...payload.anamnesis,
          officeId: office.id,
        });
        await this.anamnesisRepository.createAnamnesis(anamnesisValue);
      }
      // diagnosis detail
      if (payload.diagnosis) {
        for (const item of payload.diagnosis) {
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
      if (payload.tratamientos) {
        for (const item of payload.tratamientos) {
          const tratamientoValue = new TratamientoValue({
            ...item,
            officeId: office.id,
          });
          await this.tratamientoRepository.createTratamiento(tratamientoValue);
        }
      }
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
