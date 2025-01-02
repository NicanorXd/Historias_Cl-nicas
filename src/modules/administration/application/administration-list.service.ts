import { AdministrationRepository } from '../domain/administration.repository';

export class AdministrationListService {
  constructor(private administrationRepository: AdministrationRepository) {}

  async execute() {
    return this.administrationRepository.listAdministrations();
  }
}
