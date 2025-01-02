import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { PresentationEntity } from './presentation.entity';

export interface PresentationRepository extends PersistenceRepository {
  listPresentations(): Promise<PresentationEntity[]>;
}
