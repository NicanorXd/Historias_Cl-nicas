import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { DiagnosisDetailRepository } from '../../domain/diagnosis-detail.repository';
import {
  DiagnosisDetailCreateParams,
  DiagnosisDetailFindParams,
} from '../../domain/diagnosis-detail.params';
import { DiagnosisDetailEntity } from '../../domain/diagnosis-detail.entity';
import { DiagnosisDetailMysqlSchema } from '../schema/diagnosis-detail-mysql.schema';

@Injectable()
export class DiagnosisDetailMysqlRepository
  extends PersistenceMysqlRepository
  implements DiagnosisDetailRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async createDiagnosisDetail(
    params: DiagnosisDetailCreateParams,
  ): Promise<DiagnosisDetailEntity> {
    const repository = this.manager.getRepository(DiagnosisDetailMysqlSchema);
    const payload = repository.create(params);
    return repository.save(payload);
  }

  async deleteDiagnosisDetail(
    params: DiagnosisDetailFindParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(DiagnosisDetailMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
