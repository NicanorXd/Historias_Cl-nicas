import { ProfessionEntity } from './profession.entity';

export interface ProfessionRepository {
  listProfessions(): Promise<ProfessionEntity[]>;
}
