import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { OfficeEntity } from './office.entity';
import {
  OfficeCreateParams,
  OfficeFindParams,
  OfficePaginateParams,
} from './office.params';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';

export interface OfficeRepository extends PersistenceRepository {
  findOffice(params: OfficeFindParams): Promise<OfficeEntity>;
  paginateOffices(
    params: OfficePaginateParams,
  ): Promise<PaginateEntity<OfficeEntity>>;
  createOffice(params: OfficeCreateParams): Promise<OfficeEntity>;
}
