import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { AnamnesisEntity } from './anamnesis.entity';
import { AnamnesisValue } from './anamnesis.value';
import { AnamnesisFindParams } from './anamnesis.params';

export interface AnamnesisRepository extends PersistenceRepository {
  createAnamnesis(value: AnamnesisValue): Promise<AnamnesisEntity>;
  deleteAnamnesis(params: AnamnesisFindParams): Promise<boolean>;
}
