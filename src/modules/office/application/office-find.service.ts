import { OfficeFindParams } from '../domain/office.params';
import { OfficeRepository } from '../domain/office.repository';

export class OfficeFindService {
  constructor(private officeRepository: OfficeRepository) {}

  async execute(params: OfficeFindParams) {
    return this.officeRepository.findOffice(params);
  }
}
