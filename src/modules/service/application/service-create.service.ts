import { ServiceCreateParams } from '../domain/service.params';
import { ServiceRepository } from '../domain/service.repository';
import { ServiceValue } from '../domain/service.value';

export class ServiceCreateService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(params: ServiceCreateParams) {
    const exists = await this.serviceRepository.findService({
      description: params.description,
    });
    // validate
    if (exists) throw new Error('El registro ya existe!!!');
    // response
    const value = new ServiceValue(params);
    return this.serviceRepository.createService(value);
  }
}
