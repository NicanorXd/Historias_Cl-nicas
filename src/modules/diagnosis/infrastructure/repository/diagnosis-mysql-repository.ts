import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { DiagnosisRepository } from '../../domain/diagnosis.repository';
import { diagnosisMysqlProviderName } from '../schema/diagnosis-persistence.provider';
import { DiagnosisMysqlSchema } from '../schema/diagnosis-mysql.schema';
import {
  DiagnosisEditParams,
  DiagnosisFindParams,
  DiagnosisListParams,
  DiagnosisPaginateParams,
} from '../../domain/diagnosis.params';
import { DiagnosisEntity } from '../../domain/diagnosis.entity';
import { DiagnosisSelectMysqlQuery } from './query/diagnosis-select-mysql.query';
import { DiagnosisValue } from '../../domain/diagnosis.value';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class DiagnosisMysqlRepository
  extends PersistenceMysqlRepository
  implements DiagnosisRepository
{
  constructor(
    @Inject(diagnosisMysqlProviderName)
    private repository: Repository<DiagnosisMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async paginateDiagnoses(
    params: DiagnosisPaginateParams,
  ): Promise<PaginateEntity<DiagnosisEntity>> {
    const repository = this.manager.getRepository(DiagnosisMysqlSchema);
    const queryBuilder = new DiagnosisSelectMysqlQuery(repository).query(
      params,
    );
    return paginate(queryBuilder, { page: params.page, limit: params.limit });
  }

  async listDiagnoses(params: DiagnosisListParams): Promise<DiagnosisEntity[]> {
    const repository = this.manager.getRepository(DiagnosisMysqlSchema);
    return new DiagnosisSelectMysqlQuery(repository).query(params).getMany();
  }

  async findDiagnosis(params: DiagnosisFindParams): Promise<DiagnosisEntity> {
    const repository = this.manager.getRepository(DiagnosisMysqlSchema);
    return new DiagnosisSelectMysqlQuery(repository).query(params).getOne();
  }

  async createDiagnosis(value: DiagnosisValue): Promise<DiagnosisEntity> {
    const repository = this.manager.getRepository(DiagnosisMysqlSchema);
    const payload = this.repository.create(value);
    return repository.save(payload);
  }

  async editDiagnosis(
    params: DiagnosisFindParams,
    payload: DiagnosisEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(DiagnosisMysqlSchema);
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deleteDiagnosis(params: DiagnosisFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(DiagnosisMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
