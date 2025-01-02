import { ProfessionRepository } from '../domain/profession.repository';

export class ProfessionListService {
  constructor(private professionRepository: ProfessionRepository) {}

  async execute() {
    return this.professionRepository.listProfessions();
  }
}
