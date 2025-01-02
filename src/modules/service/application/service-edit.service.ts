import { ServiceEditParams, ServiceFindParams } from '../domain/service.params';
import { ServiceRepository } from '../domain/service.repository';

export class ServiceEditService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(params: ServiceFindParams, payload: ServiceEditParams) {
    const data = await this.serviceRepository.findService(params);
    if (!data) throw new Error('El registro no existe!!!');
    return this.serviceRepository.editService({ id: data.id }, payload);
  }
}
