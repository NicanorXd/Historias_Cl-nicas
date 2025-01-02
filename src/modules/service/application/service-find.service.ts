import { ServiceFindParams } from '../domain/service.params';
import { ServiceRepository } from '../domain/service.repository';

export class ServiceFindService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(params: ServiceFindParams) {
    const data = await this.serviceRepository.findService(params);
    if (!data) throw new Error('No se encontró el registro');
    return data;
  }
}
