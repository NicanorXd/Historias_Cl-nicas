import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { InsuredTypeEntity } from './insured-type.entity';

export interface InsuredTypeRepository extends PersistenceRepository {
  listInsuredTypes(): Promise<InsuredTypeEntity[]>;
}
