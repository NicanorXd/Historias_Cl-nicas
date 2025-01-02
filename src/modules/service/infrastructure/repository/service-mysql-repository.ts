import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { ServiceRepository } from '../../domain/service.repository';
import { serviceMysqlProviderName } from '../schema/service-persistence.provider';
import { ServiceMysqlSchema } from '../schema/service-mysql.schema';
import {
  ServiceEditParams,
  ServiceFindParams,
  ServiceListParams,
  ServicePaginateParams,
} from '../../domain/service.params';
import { ServiceEntity } from '../../domain/service.entity';
import { ServiceValue } from '../../domain/service.value';
import { ServiceSelectMysqlQuery } from './query/service-select-mysql.query';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ServiceMysqlRepository
  extends PersistenceMysqlRepository
  implements ServiceRepository
{
  constructor(
    @Inject(serviceMysqlProviderName)
    private repository: Repository<ServiceMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async paginateServices(
    params: ServicePaginateParams,
  ): Promise<PaginateEntity<ServiceEntity>> {
    const repository = this.manager.getRepository(ServiceMysqlSchema);
    const queryBuilder = new ServiceSelectMysqlQuery(repository).query(params);
    return paginate(queryBuilder, { page: params.page, limit: params.limit });
  }

  async listServices(params: ServiceListParams): Promise<ServiceEntity[]> {
    const repository = this.manager.getRepository(ServiceMysqlSchema);
    return new ServiceSelectMysqlQuery(repository).query(params).getMany();
  }

  async findService(params: ServiceFindParams): Promise<ServiceEntity> {
    const repository = this.manager.getRepository(ServiceMysqlSchema);
    return new ServiceSelectMysqlQuery(repository).query(params).getOne();
  }

  async createService(value: ServiceValue): Promise<ServiceEntity> {
    const repository = this.manager.getRepository(ServiceMysqlSchema);
    const payload = this.repository.create(value);
    return repository.save(payload);
  }

  async editService(
    params: ServiceFindParams,
    payload: ServiceEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(ServiceMysqlSchema);
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deleteService(params: ServiceFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(ServiceMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
