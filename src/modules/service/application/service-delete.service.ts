import { ServiceFindParams } from '../domain/service.params';
import { ServiceRepository } from '../domain/service.repository';

export class ServiceDeleteService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(params: ServiceFindParams) {
    const data = this.serviceRepository.findService(params);
    if (!data) throw new Error('El registro no existe!!!');
    return this.serviceRepository.deleteService(params);
  }
}
