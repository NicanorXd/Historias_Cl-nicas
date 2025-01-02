import { ServicePaginateParams } from '../domain/service.params';
import { ServiceRepository } from '../domain/service.repository';

export class ServicePaginateService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(params: ServicePaginateParams) {
    return this.serviceRepository.paginateServices(params);
  }
}
