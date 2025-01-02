import { Inject, Injectable } from '@nestjs/common';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { DataSource, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { MedicalConsultationSelectMysqlQuery } from './query/medical-consultation-select-mysql.query';
import { MedicalConsultationRepository } from '../../domain/medical-consultation.repository';
import { medicalConsultationMysqlProviderName } from '../schema/medical-consultation-persistence.provider';
import { MedicalConsultationMysqlSchema } from '../schema/medical-consultation-mysql.schema';
import {
  MedicalConsultationEditParams,
  MedicalConsultationFindParams,
  MedicalConsultationPaginateParams,
} from '../../domain/medical-consultation.params';
import { MedicalConsultationEntity } from '../../domain/medical-consultation.entity';
import { MedicalConsultationValue } from '../../domain/medical-consultation.value';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';

@Injectable()
export class MedicalConsultationMysqlRepository
  extends PersistenceMysqlRepository
  implements MedicalConsultationRepository
{
  constructor(
    @Inject(medicalConsultationMysqlProviderName)
    private repository: Repository<MedicalConsultationMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async paginateMedicalConsultations(
    params: MedicalConsultationPaginateParams,
  ): Promise<PaginateEntity<MedicalConsultationEntity>> {
    const repository = this.manager.getRepository(
      MedicalConsultationMysqlSchema,
    );
    const queryBuilder = new MedicalConsultationSelectMysqlQuery(
      repository,
    ).query(params);
    return paginate(queryBuilder, { page: params.page, limit: params.limit });
  }

  async findMedicalConsultation(
    params: MedicalConsultationFindParams,
  ): Promise<MedicalConsultationEntity> {
    const repository = this.manager.getRepository(
      MedicalConsultationMysqlSchema,
    );
    const queryBuilder = new MedicalConsultationSelectMysqlQuery(
      repository,
    ).query(params);
    return queryBuilder.getOne();
  }

  async createMedicalConsultation(
    value: MedicalConsultationValue,
  ): Promise<MedicalConsultationEntity> {
    const repository = this.manager.getRepository(
      MedicalConsultationMysqlSchema,
    );
    const payload = this.repository.create(value);
    return repository.save(payload);
  }

  async editMedicalConsultation(
    params: MedicalConsultationFindParams,
    payload: MedicalConsultationEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(
      MedicalConsultationMysqlSchema,
    );
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deleteMedicalConsultation(
    params: MedicalConsultationFindParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(
      MedicalConsultationMysqlSchema,
    );
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
