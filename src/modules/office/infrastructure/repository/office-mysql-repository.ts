import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { OfficeRepository } from '../../domain/office.repository';
import { OfficeEntity } from '../../domain/office.entity';
import {
  OfficeCreateParams,
  OfficeFindParams,
  OfficePaginateParams,
} from '../../domain/office.params';
import { OfficeMysqlSchema } from '../schema/office-mysql.schema';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { OfficeSelectMysqlQuery } from './query/office-select-mysql.query';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class OfficeMysqlRepository
  extends PersistenceMysqlRepository
  implements OfficeRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async findOffice(params: OfficeFindParams): Promise<OfficeEntity> {
    const repository = this.manager.getRepository(OfficeMysqlSchema);
    const queryBuilder = new OfficeSelectMysqlQuery(repository);
    return queryBuilder.query(params).getOne();
  }

  async paginateOffices(
    params: OfficePaginateParams,
  ): Promise<PaginateEntity<OfficeEntity>> {
    const repository = this.manager.getRepository(OfficeMysqlSchema);
    const queryBuilder = new OfficeSelectMysqlQuery(repository);
    return paginate(queryBuilder.query(params), {
      page: params.page,
      limit: params.limit,
    });
  }

  async createOffice(params: OfficeCreateParams): Promise<OfficeEntity> {
    const repository = this.manager.getRepository(OfficeMysqlSchema);
    const payload = repository.create(params);
    return repository.save(payload);
  }
}
