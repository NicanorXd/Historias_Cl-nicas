import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { AdministrationEntity } from './administration.entity';

export interface AdministrationRepository extends PersistenceRepository {
  listAdministrations(): Promise<AdministrationEntity[]>;
}
