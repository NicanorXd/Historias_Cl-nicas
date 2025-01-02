import { OfficePaginateParams } from '../domain/office.params';
import { OfficeRepository } from '../domain/office.repository';

export class OfficePaginateService {
  constructor(private officeRepository: OfficeRepository) {}

  async execute(params: OfficePaginateParams) {
    return this.officeRepository.paginateOffices(params);
  }
}
