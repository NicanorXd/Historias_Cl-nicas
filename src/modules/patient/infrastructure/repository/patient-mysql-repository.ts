import { Inject, Injectable } from '@nestjs/common';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { DataSource, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PatientRepository } from '../../domain/patient.repository';
import { patientMysqlProviderName } from '../schema/patient-persistence.provider';
import { PatientMysqlSchema } from '../schema/patient-mysql.schema';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import {
  PatientEditParams,
  PatientFindParams,
  PatientListParams,
  PatientPaginateParams,
  PatientReportParams,
} from '../../domain/patient.params';
import { PatientEntity } from '../../domain/patient.entity';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { PatientValue } from '../../domain/patient.value';
import { PatientSelectMysqlQuery } from './query/patient-select-mysql.query';
import { PatientReportInterface } from '../../domain/interfaces/patient-report.interface';
import { PatientReportMysqlQuery } from './query/patient-report-mysql.query';

@Injectable()
export class PatientMysqlRepository
  extends PersistenceMysqlRepository
  implements PatientRepository
{
  constructor(
    @Inject(patientMysqlProviderName)
    private repository: Repository<PatientMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async paginatePatients(
    params: PatientPaginateParams,
  ): Promise<PaginateEntity<PatientEntity>> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    const queryBuilder = new PatientSelectMysqlQuery(repository).query(params);
    return paginate(queryBuilder, { page: params.page, limit: params.limit });
  }

  async listPatients(params: PatientListParams): Promise<PatientEntity[]> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    return new PatientSelectMysqlQuery(repository).query(params).getMany();
  }

  async findPatient(params: PatientFindParams): Promise<PatientEntity> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    return new PatientSelectMysqlQuery(repository).query(params).getOne();
  }

  async createPatient(value: PatientValue): Promise<PatientEntity> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    const payload = this.repository.create(value);
    return repository.save(payload);
  }

  async editPatient(
    params: PatientFindParams,
    payload: PatientEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deletePatient(params: PatientFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }

  async countPatient(params: PatientListParams): Promise<number> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    const { total } = await new PatientSelectMysqlQuery(repository)
      .query(params)
      .select('COUNT(*) total')
      .getRawOne();
    return parseInt(total);
  }

  async listReport(
    params: PatientReportParams,
  ): Promise<PatientReportInterface[]> {
    const repository = this.manager.getRepository(PatientMysqlSchema);
    return new PatientReportMysqlQuery(repository).query(params).getRawMany();
  }
}
