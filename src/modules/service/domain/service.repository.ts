import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { ServiceEntity } from './service.entity';
import {
  ServiceEditParams,
  ServiceFindParams,
  ServiceListParams,
  ServicePaginateParams,
} from './service.params';
import { ServiceValue } from './service.value';
import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';

export interface ServiceRepository extends PersistenceRepository {
  paginateServices(
    params: ServicePaginateParams,
  ): Promise<PaginateEntity<ServiceEntity>>;
  listServices(params: ServiceListParams): Promise<ServiceEntity[]>;
  findService(params: ServiceFindParams): Promise<ServiceEntity>;
  createService(value: ServiceValue): Promise<ServiceEntity>;
  editService(
    params: ServiceFindParams,
    payload: ServiceEditParams,
  ): Promise<boolean>;
  deleteService(params: ServiceFindParams): Promise<boolean>;
}
