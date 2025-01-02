import { InsuredTypeRepository } from '../domain/insured-type.repository';

export class InsuredTypeListService {
  constructor(private insuredTypeRepository: InsuredTypeRepository) {}

  async execute() {
    return this.insuredTypeRepository.listInsuredTypes();
  }
}
